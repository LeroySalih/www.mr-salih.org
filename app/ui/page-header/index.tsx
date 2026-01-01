type Props = {
    title: string;
    subtitle?: string;
};

const PageHeader = ({ title, subtitle }: Props) => {
    return (
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
            <div className="mt-3 h-[2px] w-16 bg-green-600 rounded"></div>
        </div>
    );
};

export default PageHeader;