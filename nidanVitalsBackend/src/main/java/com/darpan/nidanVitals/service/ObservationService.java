package com.darpan.nidanVitals.service;

import com.darpan.nidanVitals.dto.VitalsInputDTO;
import org.hl7.fhir.r4.model.Observation;

public interface ObservationService {
    String saveObservation(VitalsInputDTO vitalsInputDTO);

    String getObservation(String patientId);
}
