

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div>
            <div className="max-w-4xl mx-auto text-center mt-20 mb-5">
                <h2 className="text-3xl font-extrabold leading-9 sm:text-4xl sm:leading-10">
                    {heading}
                </h2>
                <p className="mt-3 text-base leading-7 sm:mt-4">
                    {subHeading}
                </p>
            </div>
        </div>
    );
};

export default SectionTitle;