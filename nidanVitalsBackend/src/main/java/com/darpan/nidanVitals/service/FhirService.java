package com.darpan.nidanVitals.service;

import com.darpan.nidanVitals.dto.VitalsInputDTO;
import org.hl7.fhir.r4.model.Observation;

public interface FhirService {

    Observation createFhirObservation(VitalsInputDTO vitalsInputDTO);
    public String SerializeObservationResource(Observation observation);
}
