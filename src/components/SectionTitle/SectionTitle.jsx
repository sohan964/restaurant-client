

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-center md:w-4/12 my-8">
            <p className="text-yellow-500 mb-2">---{subHeading}---</p>
            <h3 className="text-xl uppercase border-y-4 p-4" >{heading}</h3>
        </div>
    );
};

export default SectionTitle;