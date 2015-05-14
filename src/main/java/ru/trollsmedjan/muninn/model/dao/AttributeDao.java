package ru.trollsmedjan.muninn.model.dao;

import org.springframework.data.repository.CrudRepository;
import ru.trollsmedjan.muninn.model.Attribute;
import ru.trollsmedjan.muninn.model.PowerSource;

import java.util.Collection;
import java.util.Optional;

/**
 * Created by syachin on 14.05.2015.
 */
public interface AttributeDao extends CrudRepository<Attribute, Long> {

    Collection<Attribute> findByPowerSource(PowerSource powerSource);
}
