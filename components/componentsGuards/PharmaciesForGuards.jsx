const PharmaciesForGuards = ({pharmacies}) => {

  function formatTime(timeString) {
    return timeString === "00:00" ? "" : timeString
  }

  return (
    <div className="container-pros-guards">
      <h2>Les pharmacies disponibles</h2>
        <section>
          <div className="pharmacies" data-aos="zoom-in" data-aos-delay="1200" data-aos-duration="1500">
            {pharmacies.map((pharmacy, index) => (
              <div key={index} className="bloc">
                <h3>{pharmacy.lastname} {pharmacy.firstname}</h3>
                <p>{pharmacy.address}</p>
                <p>{pharmacy.zip} {pharmacy.city}</p>
                {/*<a href="tel:{{pharmacy.phone}}">{pharmacy.phone}</a>*/}
                <p>{pharmacy.details}</p>
                <p>{formatTime(pharmacy.h_start_morning.substring(0, 5))}  {formatTime(pharmacy.h_end_morning.substring(0, 5))} / {formatTime(pharmacy.h_start_afternoon.substring(0, 5))}  {formatTime(pharmacy.h_end_afternoon.substring(0, 5))}</p>
              </div>
            ))}
          </div>
        </section>
    </div>
  )
}

export default PharmaciesForGuards