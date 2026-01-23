package com.darpan.nidanVitals.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String patientId;
    private Double bmi;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String rawFhirJson;
}
