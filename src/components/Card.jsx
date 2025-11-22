const Card = ({ title, img, description }) => {
    return (
        <>
            <div className="flex flex-col items-center border p-4 w-98">
                <h2 className="font-bold">{title}</h2>
                <img src={img} alt={title} width={100} height={100} />
                <p className="text-left"><b>Description: </b>{description}</p>
            </div>

        </>
    )
}

export default Card;