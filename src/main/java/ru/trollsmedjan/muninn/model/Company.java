package ru.trollsmedjan.muninn.model;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import java.util.UUID;

/**
 * Created by syachin on 14.05.2015.
 */
@Entity
@Table(name="companies")
public class Company {

    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    @Id
    private UUID uuid;

    @NotBlank
    private String name;


    //==================================================================================================================
    //===============================               GENERATED METHODS               ====================================
    //==================================================================================================================


    @Override
    public String toString() {
        return "Company{" +
                "uuid=" + uuid +
                ", name='" + name + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Company)) return false;

        Company company = (Company) o;

        if (name != null ? !name.equals(company.name) : company.name != null) return false;
        if (uuid != null ? !uuid.equals(company.uuid) : company.uuid != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = uuid != null ? uuid.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }

    public UUID getUuid() {

        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
