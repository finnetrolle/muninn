package ru.trollsmedjan.muninn.model.dao;

import org.springframework.data.repository.CrudRepository;
import ru.trollsmedjan.muninn.model.Company;
import ru.trollsmedjan.muninn.model.User;

import java.util.Optional;
import java.util.UUID;

/**
 * Created by syachin on 14.05.2015.
 */
public interface CompanyDao extends CrudRepository<Company, UUID> {

}
