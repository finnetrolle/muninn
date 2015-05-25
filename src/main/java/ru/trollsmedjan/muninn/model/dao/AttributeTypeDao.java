package ru.trollsmedjan.muninn.model.dao;

import org.springframework.data.repository.CrudRepository;
import ru.trollsmedjan.muninn.model.AttributeType;

import java.util.Collection;
import java.util.Optional;

/**
 * Created by syachin on 14.05.2015.
 */
public interface AttributeTypeDao extends CrudRepository<AttributeType, Long> {

    AttributeType findOneByName(String name);

}
