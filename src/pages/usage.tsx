import { CustomOpenAIKeyForm } from '@/components/CustomOpenAIKeyForm'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Purchase } from '@/components/Purchase'

export function UsagePage() {
    return (
        <div>
            <Header />
            <main>
                <Purchase />
            </main>
            <Footer />
        </div>
    )
}
