package com.darpan.nidanVitals.controller;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;
import com.darpan.nidanVitals.dto.VitalsInputDTO;
import com.darpan.nidanVitals.service.FhirService;
import com.darpan.nidanVitals.service.ObservationService;
import lombok.NonNull;
import org.hl7.fhir.r4.model.Observation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fhir")
@CrossOrigin("http://localhost:3000")
public class DashboardController {

    private final ObservationService observationService;

    DashboardController(ObservationService observationService){
        this.observationService = observationService;
    }

    @PostMapping("/observation")
    public ResponseEntity<@NonNull String> createObservation(@RequestBody VitalsInputDTO vitalsInputDTO){
        try {
            String fhirJson = observationService.saveObservation(vitalsInputDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(fhirJson);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error: "+e.getMessage());
        }
    }
}
