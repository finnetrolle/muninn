package ru.trollsmedjan.muninn.model.dao;

import org.springframework.data.repository.CrudRepository;
import ru.trollsmedjan.muninn.model.Document;
import ru.trollsmedjan.muninn.model.PowerSource;

import java.util.Collection;

/**
 * Created by syachin on 14.05.2015.
 */

public interface DocumentDao extends CrudRepository<Document, Long> {

    Collection<Document> findByPowerSource(PowerSource powerSource);
}
