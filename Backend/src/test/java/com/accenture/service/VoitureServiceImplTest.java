package com.accenture.service;

import com.accenture.dal.entity.Permis;
import com.accenture.dal.entity.vehicules.TypeEnergie;
import com.accenture.dal.entity.vehicules.TypeTransmission;
import com.accenture.dal.entity.vehicules.TypeVoiture;
import com.accenture.dal.entity.vehicules.Voiture;
import com.accenture.dal.repository.VoitureDao;
import com.accenture.exception.VehiculeException;
import com.accenture.service.dto.VoitureDto;
import com.accenture.service.mapper.VoitureMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class VoitureServiceImplTest {

    @InjectMocks
    private VoitureServiceImpl voitureService;

    @Mock
    private VoitureDao voitureDao;

    @Mock
    private VoitureMapper voitureMapper;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAjouterVoiture() {
        VoitureDto voitureDto = new VoitureDto(1, "marque", "modele", "couleur", 5, 5, 100, false, false, TypeEnergie.ESSENCE, 5, TypeTransmission.MANUELLE, true, 3, TypeVoiture.BERLINE, Permis.A);

        when(voitureMapper.voitureDtoToVoiture(voitureDto)).thenReturn(new Voiture());

        assertDoesNotThrow(() -> voitureService.ajouter(voitureDto));

        verify(voitureDao, times(1)).save(any(Voiture.class));
    }

    @Test
    void testAjouterVoitureWithIncorrectArgs() {
        VoitureDto voitureDto = null;

        VehiculeException vehiculeException = assertThrows(VehiculeException.class, () -> {
            voitureService.ajouter(voitureDto);
        });

        assertEquals("La voiture est nulle", vehiculeException.getMessage());

        verify(voitureDao, never()).save(any());
    }

    @Test
    void testAjouterVoitureWithIncorrectMarque() {
        VoitureDto voitureDto = new VoitureDto(1, null, "modele", "couleur", 5, 5, 100, false, false, TypeEnergie.ESSENCE, 5, TypeTransmission.MANUELLE, true, 3, TypeVoiture.BERLINE, Permis.A);

        VehiculeException vehiculeException = assertThrows(VehiculeException.class, () -> {
            voitureService.ajouter(voitureDto);
        });

        assertEquals("La marque est obligatoire", vehiculeException.getMessage());

        verify(voitureDao, never()).save(any());
    }

    @Test
    void testAjouterVoitureWithIncorrectModele() {
        VoitureDto voitureDto = new VoitureDto(1, "marque", null, "couleur", 5, 5, 100, false, false, TypeEnergie.ESSENCE, 5, TypeTransmission.MANUELLE, true, 3, TypeVoiture.BERLINE, Permis.A);

        VehiculeException vehiculeException = assertThrows(VehiculeException.class, () -> {
            voitureService.ajouter(voitureDto);
        });

        assertEquals("Le modèle est obligatoire", vehiculeException.getMessage());

        verify(voitureDao, never()).save(any());
    }

    @Test
    void testAjouterVoitureWithIncorrectCouleur() {
        VoitureDto voitureDto = new VoitureDto(1, "marque", "modele", null, 5, 5, 100, false, false, TypeEnergie.ESSENCE, 5, TypeTransmission.MANUELLE, true, 3, TypeVoiture.BERLINE, Permis.A);

        VehiculeException vehiculeException = assertThrows(VehiculeException.class, () -> {
            voitureService.ajouter(voitureDto);
        });

        assertEquals("La couleur est obligatoire", vehiculeException.getMessage());

        verify(voitureDao, never()).save(any());
    }

    @Test
    void testAjouterVoitureWithIncorrectNombrePlaces() {
        VoitureDto voitureDto = new VoitureDto(1, "marque", "modele", "couleur", 0, 5, 100, false, false, TypeEnergie.ESSENCE, 5, TypeTransmission.MANUELLE, true, 3, TypeVoiture.BERLINE, Permis.A);

        VehiculeException vehiculeException = assertThrows(VehiculeException.class, () -> {
            voitureService.ajouter(voitureDto);
        });

        assertEquals("Le nombre de places est obligatoire", vehiculeException.getMessage());

        verify(voitureDao, never()).save(any());
    }

    @Test
    void testAjouterVoitureWithIncorrectNombrePortes() {
        VoitureDto voitureDto = new VoitureDto(1, "marque", "modele", "couleur", 5, 10, 100, false, false, TypeEnergie.ESSENCE, 0, TypeTransmission.MANUELLE, true, 3, TypeVoiture.BERLINE, Permis.A);

        Voiture voiture = new Voiture();

        when(voitureMapper.voitureDtoToVoiture(voitureDto)).thenReturn(voiture);

        VehiculeException vehiculeException = assertThrows(VehiculeException.class, () -> {
            voitureService.ajouter(voitureDto);
        });

        assertEquals("Le nombre de portes est obligatoire", vehiculeException.getMessage());

        verify(voitureDao, never()).save(any());
    }

    @Test
    void testAjouterVoitureWithIncorrectTarifJournalier() {
        VoitureDto voitureDto = new VoitureDto(1, "marque", "modele", "couleur", 5, 0, 0, false, false, TypeEnergie.ESSENCE, 5, TypeTransmission.MANUELLE, true, 3, TypeVoiture.BERLINE, Permis.A);

        Voiture voiture = new Voiture();

        when(voitureMapper.voitureDtoToVoiture(voitureDto)).thenReturn(voiture);

        VehiculeException vehiculeException = assertThrows(VehiculeException.class, () -> {
            voitureService.ajouter(voitureDto);
        });

        assertEquals("Le tarif journalier est obligatoire", vehiculeException.getMessage());

        verify(voitureDao, never()).save(any());
    }

    @Test
    void testAjouterVoitureWithIncorrectKilometrage() {
        VoitureDto voitureDto = new VoitureDto(1, "marque", "modele", "couleur", 5, 5, 0, false, false, TypeEnergie.ESSENCE, 5, TypeTransmission.MANUELLE, true, 3, TypeVoiture.BERLINE, Permis.A);

        Voiture voiture = new Voiture();

        when(voitureMapper.voitureDtoToVoiture(voitureDto)).thenReturn(voiture);

        VehiculeException vehiculeException = assertThrows(VehiculeException.class, () -> {
            voitureService.ajouter(voitureDto);
        });

        assertEquals("Le kilométrage est obligatoire", vehiculeException.getMessage());

        verify(voitureDao, never()).save(any());
    }

    @Test
    void testAjouterVoitureWithIncorrectTypeEnergie() {
        VoitureDto voitureDto = new VoitureDto(1, "marque", "modele", "couleur", 5, 5, 100, false, false, null, 5, TypeTransmission.MANUELLE, true, 3, TypeVoiture.BERLINE, Permis.A);

        Voiture voiture = new Voiture();

        when(voitureMapper.voitureDtoToVoiture(voitureDto)).thenReturn(voiture);

        VehiculeException vehiculeException = assertThrows(VehiculeException.class, () -> {
            voitureService.ajouter(voitureDto);
        });

        assertEquals("Le type d'énergie est obligatoire", vehiculeException.getMessage());

        verify(voitureDao, never()).save(any());
    }

    @Test
    void testAjouterVoitureWithIncorrectTypeTransmission() {
        VoitureDto voitureDto = new VoitureDto(1, "marque", "modele", "couleur", 5, 5, 100, false, false, TypeEnergie.ESSENCE, 5, null, true, 3, TypeVoiture.BERLINE, Permis.A);

        Voiture voiture = new Voiture();

        when(voitureMapper.voitureDtoToVoiture(voitureDto)).thenReturn(voiture);

        VehiculeException vehiculeException = assertThrows(VehiculeException.class, () -> {
            voitureService.ajouter(voitureDto);
        });

        assertEquals("La transmission est obligatoire", vehiculeException.getMessage());

        verify(voitureDao, never()).save(any());
    }

    @Test
    void testAjouterVoitureWithIncorrectTypeVoiture() {
        VoitureDto voitureDto = new VoitureDto(1, "marque", "modele", "couleur", 5, 5, 100, false, false, TypeEnergie.ESSENCE, 5, TypeTransmission.MANUELLE, true, 3, null, Permis.A);

        Voiture voiture = new Voiture();

        when(voitureMapper.voitureDtoToVoiture(voitureDto)).thenReturn(voiture);

        VehiculeException vehiculeException = assertThrows(VehiculeException.class, () -> {
            voitureService.ajouter(voitureDto);
        });

        assertEquals("Le type de voiture est obligatoire", vehiculeException.getMessage());

        verify(voitureDao, never()).save(any());
    }

    @Test
    void testAjouterVoitureWithIncorrectNombreBagages() {
        VoitureDto voitureDto = new VoitureDto(1, "marque", "modele", "couleur", 5, 5, 100, false, false, TypeEnergie.ESSENCE, 5, TypeTransmission.MANUELLE, true, 0, TypeVoiture.BERLINE, Permis.A);

        Voiture voiture = new Voiture();

        when(voitureMapper.voitureDtoToVoiture(voitureDto)).thenReturn(voiture);

        VehiculeException vehiculeException = assertThrows(VehiculeException.class, () -> {
            voitureService.ajouter(voitureDto);
        });

        assertEquals("Le nombre de bagages est obligatoire", vehiculeException.getMessage());

        verify(voitureDao, never()).save(any());
    }

    @Test
    void testModifierVoiture() {
        int id = 1;
        VoitureDto voitureDto = new VoitureDto(1, "marque", "modele", "couleur", 5, 5, 100, false, false, TypeEnergie.ESSENCE, 5, TypeTransmission.MANUELLE, true, 3, TypeVoiture.BERLINE, Permis.A);

        Voiture voiture = new Voiture();

        Optional<Voiture> optionalVoiture = Optional.of(voiture);

        when(voitureDao.findById(id)).thenReturn(optionalVoiture);
        when(voitureMapper.voitureDtoToVoiture(voitureDto)).thenReturn(voiture);

        assertDoesNotThrow(() -> voitureService.modifier(voitureDto, id));

        verify(voitureDao, times(1)).save(any(Voiture.class));
    }

    @Test
    void testModifierVoitureNull() {
        int id = 1;
        VoitureDto voitureDto = null;

        VehiculeException vehiculeException = assertThrows(VehiculeException.class, () -> {
            voitureService.modifier(voitureDto, id);
        });

        assertEquals("La voiture est nulle", vehiculeException.getMessage());

        verify(voitureDao, never()).save(any());
    }

    @Test
    void testModifierVoitureNotFound() {
        int id = 1;
        VoitureDto voitureDto = new VoitureDto(1, "marque", "modele", "couleur", 5, 5, 100, false, false, TypeEnergie.ESSENCE, 5, TypeTransmission.MANUELLE, true, 3, TypeVoiture.BERLINE, Permis.A);

        Optional<Voiture> optionalVoiture = Optional.empty();

        when(voitureDao.findById(id)).thenReturn(optionalVoiture);

        VehiculeException vehiculeException = assertThrows(VehiculeException.class, () -> {
            voitureService.modifier(voitureDto, id);
        });

        assertEquals("La voiture à modifier n'existe pas", vehiculeException.getMessage());

        verify(voitureDao, never()).save(any());
    }

    @Test
    void testSupprimerVoiture() {
        int id = 1;

        assertDoesNotThrow(() -> voitureService.supprimer(id));

        verify(voitureDao, times(1)).deleteById(id);
    }

    @Test
    void testSupprimerVoitureByDto() {
        VoitureDto voitureDto = new VoitureDto(1, "marque", "modele", "couleur", 5, 5, 100, false, false, TypeEnergie.ESSENCE, 5, TypeTransmission.MANUELLE, true, 3, TypeVoiture.BERLINE, Permis.A);

        Voiture voiture = new Voiture();

        when(voitureMapper.voitureDtoToVoiture(voitureDto)).thenReturn(voiture);

        assertDoesNotThrow(() -> voitureService.supprimer(voitureDto));

        verify(voitureDao, times(1)).delete(voiture);
    }

    @Test
    void testGetVoitureById() {
        int id = 1;

        voitureService.getVoitureById(id);

        verify(voitureDao, times(1)).findById(id);
    }

    @Test
    void testGetAllVoitures() {
        voitureService.getAllVoitures();

        verify(voitureDao, times(1)).findAll();
    }

    @Test
    void testDesactiver() {
        VoitureDto voitureDto = new VoitureDto(1, "marque", "modele", "couleur", 5, 5, 100, false, false, TypeEnergie.ESSENCE, 5, TypeTransmission.MANUELLE, true, 3, TypeVoiture.BERLINE, Permis.A);

        Voiture voiture = new Voiture();

        when(voitureDao.findById(voitureDto.id())).thenReturn(Optional.of(voiture));

        assertDoesNotThrow(() -> voitureService.desactiver(1));

        verify(voitureDao, times(1)).save(voiture);
    }

}