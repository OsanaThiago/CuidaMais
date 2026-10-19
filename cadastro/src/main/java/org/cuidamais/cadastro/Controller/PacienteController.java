package org.cuidamais.cadastro.Controller;

import java.util.List;
import org.cuidamais.cadastro.Model.Paciente;
import org.cuidamais.cadastro.Repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/pacientes"})
@CrossOrigin(
        origins = {"*"}
)
public class PacienteController {
    @Autowired
    private PacienteRepository repository;
    @GetMapping
    public List<Paciente> listarUsuarios(@RequestParam String email) {
        return this.repository.findByEmail(email);
    }
    @PostMapping
    public ResponseEntity<Paciente> criarPaciente(@RequestBody Paciente paciente) {
        Paciente pacienteSalvo = (Paciente)this.repository.save(paciente);
        return ResponseEntity.ok(pacienteSalvo);
    }
}
