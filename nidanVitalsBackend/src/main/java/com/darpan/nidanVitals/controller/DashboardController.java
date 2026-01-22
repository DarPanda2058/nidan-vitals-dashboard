package com.darpan.nidanVitals.controller;

import com.darpan.nidanVitals.dto.VitalsInputDTO;
import com.darpan.nidanVitals.service.ObservationService;
import lombok.NonNull;
import org.checkerframework.checker.units.qual.N;
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
            String fhirJson = observationService.setObservation(vitalsInputDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(fhirJson);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error: "+e.getMessage());
        }
    }

    @GetMapping("/observation")
    public ResponseEntity<@NonNull String> fetchObservation(@RequestParam(required = false) String patientId){
        try{
            String fhirJson = observationService.getObservation(patientId);
            return ResponseEntity.status(HttpStatus.CREATED).body(fhirJson);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error: "+e.getMessage());
        }
    }
}
