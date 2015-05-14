package ru.trollsmedjan.muninn.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by syachin on 14.05.2015.
 */
@Entity
@Table(name="attributeTypes")
public class AttributeType {

    @Id
    @GeneratedValue
    private long id;

    private String name;

    //==================================================================================================================
    //===============================               GENERATED METHODS               ====================================
    //==================================================================================================================


    @Override
    public String toString() {
        return "AttributeType{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AttributeType)) return false;

        AttributeType that = (AttributeType) o;

        if (name != null ? !name.equals(that.name) : that.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return name != null ? name.hashCode() : 0;
    }

    public long getId() {

        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
