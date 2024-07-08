const DoctorsForGuards = ({ doctors }) => {

    function formatTime(timeString) {
        return timeString === "00:00" ? "" : timeString
    }

    return (
      <div className="container-pros-guards">
        <h2>Les médecins disponibles</h2>
        <section>
          <div className="doctors" data-aos="zoom-in" data-aos-delay="1800" data-aos-duration="1500">
            {doctors.map((doctor, index) => (
              <div key={index} className="bloc">
                <h3>{doctor.lastname} {doctor.firstname}</h3>
                <p>{doctor.address}</p>
                <p>{doctor.zip} {doctor.city}</p>
                {/*<a href="tel:{{doctor.phone}}">{doctor.phone}</a>*/}
                <p>{doctor.details}</p>
                <p>
                  {formatTime(doctor.h_start_morning.substring(0, 5))} {formatTime(doctor.h_end_morning.substring(0, 5))}
                  {((formatTime(doctor.h_start_afternoon.substring(0, 5)) !== "") || (formatTime(doctor.h_end_afternoon.substring(0, 5)) !== "")) &&
                  ` / ${formatTime(doctor.h_start_afternoon.substring(0, 5))} ${formatTime(doctor.h_end_afternoon.substring(0, 5))}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }
  
  export default DoctorsForGuards