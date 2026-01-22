package com.darpan.nidanVitals.service;

import com.darpan.nidanVitals.dto.VitalsInputDTO;

public interface ObservationService {
    String setObservation(VitalsInputDTO vitalsInputDTO);

    String getObservation(String patientId);
}
