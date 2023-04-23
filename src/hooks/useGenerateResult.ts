import { loadOpenAIKey,loadLicenseKey } from '@/utils/localData';
import { GenerateApiInput } from '@/utils/types';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import {HOST_URL} from '@/utils/hostUrl';
import {licenceKeyRef, userUUID} from '@/ui.state';

export const useGenerateResult = () => {
  const navigate = useNavigate();
  const [generatedResults, setGeneratedResults] = useState<string>('');
  const isStreamingRef = useRef<boolean>(true)

  async function generate(body: GenerateApiInput) {
    setGeneratedResults('');
    isStreamingRef.current = true

    try {
      const response = await fetch(HOST_URL+'/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-License-Key':licenceKeyRef.value ,
          'X-UUID': userUUID.value
        },
        body: JSON.stringify({
          ...body,
          // userKey: loadLicenseKey() || loadOpenAIKey(),
        }),
      });

      if (!response.ok) {
        if (response.status === 403) {
          toast(`锦囊躲进草丛里啦`, { icon: '🚧' })
          navigate('/usage');
          return;
        }
        toast(`锦囊开启出错啦`, { icon: '🔴' });
      }

      // This data is a ReadableStream
      const data = response.body;
      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done && isStreamingRef.current) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setGeneratedResults((prev) => prev + chunkValue);
      }
      reader.cancel().then(() => {
        readyStream()
      })

    } catch (error) {
      // console.error(error); // 可以把错误打印到控制台
      toast(`锦囊开启出错啦`, { icon: '🔴' });
    }

  }
  function stopStream() {
    isStreamingRef.current = false;
  }

  function readyStream() {
    isStreamingRef.current = true;
  }

  return { generatedResults, generate,stopStream };
};

export async function useFakeGenerate() {
  const [generatedResults, setGeneratedResults] = useState<string>('');

  setGeneratedResults('');

  // 使用 fake 数据流替代 API 请求
  const fakeData = "这是 fake 数据流的内容。";
  const dataStream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode(fakeData));
      controller.close();
    },
  });

  const response = new Response(dataStream);

  // 处理 response
  const data = response.body;
  if (!data) {
    return;
  }

  const reader = data.getReader();
  const decoder = new TextDecoder();
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);
    setGeneratedResults((prev) => prev + chunkValue);
  }
  return { generatedResults , setGeneratedResults };
}
