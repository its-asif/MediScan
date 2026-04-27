

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div>
            <div className="mediscan-shell text-center mt-20 mb-8">
                <span className="mediscan-pill">Featured experience</span>
                <h2 className="mediscan-heading mt-6">
                    {heading}
                </h2>
                <p className="mediscan-subheading mx-auto">
                    {subHeading}
                </p>
            </div>
        </div>
    );
};

export default SectionTitle;