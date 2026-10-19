package org.cuidamais.cadastro.Repository;

import java.util.List;
import org.cuidamais.cadastro.Model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    List<Paciente> findByEmail(String email);
}
