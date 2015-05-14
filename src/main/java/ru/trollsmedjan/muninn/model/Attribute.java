package ru.trollsmedjan.muninn.model;



import javax.persistence.*;

/**
 * Created by syachin on 14.05.2015.
 */
@Entity
@Table(name="attributes")
public class Attribute {

    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    private AttributeType attributeType;

    private String value;

    @ManyToOne
    private PowerSource powerSource;

    //==================================================================================================================
    //===============================               GENERATED METHODS               ====================================
    //==================================================================================================================


    @Override
    public String toString() {
        return "Attribute{" +
                "id=" + id +
                ", attributeType=" + attributeType +
                ", value='" + value + '\'' +
                ", powerSource=" + powerSource +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Attribute)) return false;

        Attribute attribute = (Attribute) o;

        if (attributeType != null ? !attributeType.equals(attribute.attributeType) : attribute.attributeType != null)
            return false;
        if (powerSource != null ? !powerSource.equals(attribute.powerSource) : attribute.powerSource != null)
            return false;
        if (value != null ? !value.equals(attribute.value) : attribute.value != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = attributeType != null ? attributeType.hashCode() : 0;
        result = 31 * result + (value != null ? value.hashCode() : 0);
        result = 31 * result + (powerSource != null ? powerSource.hashCode() : 0);
        return result;
    }

    public long getId() {

        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public AttributeType getAttributeType() {
        return attributeType;
    }

    public void setAttributeType(AttributeType attributeType) {
        this.attributeType = attributeType;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public PowerSource getPowerSource() {
        return powerSource;
    }

    public void setPowerSource(PowerSource powerSource) {
        this.powerSource = powerSource;
    }
}
