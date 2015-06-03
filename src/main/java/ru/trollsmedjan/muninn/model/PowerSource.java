package ru.trollsmedjan.muninn.model;


import org.springframework.data.geo.Point;
import org.springframework.data.geo.Polygon;


import javax.persistence.*;

/**
 * Created by syachin on 14.05.2015.
 */
@Entity
@Table(name="powerSources")
public class PowerSource {

    @Id
    @GeneratedValue
    private long id;

    private String name;

    private String power;

    private double usedPower;

    @Lob
    @Column(name="area_polygon", columnDefinition="blob")
    private Polygon polygon = null;

//    @Transient
    private Point location = new Point(0, 0);

    @ManyToOne
    private Company company;

    //==================================================================================================================
    //===============================               GENERATED METHODS               ====================================
    //==================================================================================================================


    @Override
    public String toString() {
        return "PowerSource{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", power='" + power + '\'' +
                ", usedPower=" + usedPower +
                ", polygon=" + polygon +
                ", location=" + location +
                ", company=" + company +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PowerSource)) return false;

        PowerSource that = (PowerSource) o;

        if (Double.compare(that.usedPower, usedPower) != 0) return false;
        if (company != null ? !company.equals(that.company) : that.company != null) return false;
        if (location != null ? !location.equals(that.location) : that.location != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (polygon != null ? !polygon.equals(that.polygon) : that.polygon != null) return false;
        if (power != null ? !power.equals(that.power) : that.power != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = name != null ? name.hashCode() : 0;
        result = 31 * result + (power != null ? power.hashCode() : 0);
        temp = Double.doubleToLongBits(usedPower);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        result = 31 * result + (polygon != null ? polygon.hashCode() : 0);
        result = 31 * result + (location != null ? location.hashCode() : 0);
        result = 31 * result + (company != null ? company.hashCode() : 0);
        return result;
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

    public String getPower() {
        return power;
    }

    public void setPower(String power) {
        this.power = power;
    }

    public double getUsedPower() {
        return usedPower;
    }

    public void setUsedPower(double usedPower) {
        this.usedPower = usedPower;
    }

    public Polygon getPolygon() {
        return polygon;
    }

    public void setPolygon(Polygon polygon) {
        this.polygon = polygon;
    }

    public Point getLocation() {
        return location;
    }

    public void setLocation(Point location) {
        this.location = location;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
}
