import React from "react";
import ServiceCard from "../components/ServiceCard";
import { useAuth } from "../store/auth";

const Service = () => {
  const { services } = useAuth();
  // console.log(services);

  return (
    <>
      <section className="section-services">
        <div className="container">
          <h1 className="main-heading">Services</h1>
        </div>

        <div className="container grid grid-three-cols">
          
            {services.map((curService, index) => {
              const { price,description,provider,service } = curService;
              return (
                <ServiceCard
                  key={index}
                  service={service}
                  description={description}
                  price={price}
                  provider={provider}
                />
              );
            })}
          
        </div>
      </section>
    </>
  );
};

export default Service;
