const PharmaciesOnCallForGuards = ({ pharmaciesOnCall }) => {
    function formatTime(timeString) {
        return timeString === "00:00" ? "" : timeString 
    }

    return (
        <div className="container-pros-guards">
            <h2>Les pharmacies de garde disponibles</h2>
            <section>
                <div className="pharmacies" data-aos="zoom-in" data-aos-delay="1500" data-aos-duration="1500">
                    {pharmaciesOnCall.map((pharmacy, index) => (
                        <div key={index} className="bloc">
                            <h3>{pharmacy.name}</h3>
                            <p>{pharmacy.address}</p>
                            {/*<a href={`tel:${pharmacy.phone}`}>{pharmacy.phone}</a>*/}
                            <p>{formatTime(pharmacy.start_time.substring(0, 5))} / {formatTime(pharmacy.end_time.substring(0, 5))}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    ) 
} 

export default PharmaciesOnCallForGuards 
