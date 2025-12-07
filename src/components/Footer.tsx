import content from '@/data/content.json';

export default function Footer() {
    const { footer } = content;
    const year = new Date().getFullYear();

    return (
        <footer className="py-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            <p>&copy; {year} {footer.copyright}. All rights reserved.</p>
        </footer>
    );
}
