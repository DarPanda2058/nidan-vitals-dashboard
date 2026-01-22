package com.darpan.nidanVitals.repository;

import com.darpan.nidanVitals.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ObservationRepository extends JpaRepository<Patient, Integer> {
    Optional<Patient> findByPatientId(String patientId);
}
