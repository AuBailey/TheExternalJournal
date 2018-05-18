package pro200.neumont.edu.externaljournal.Model.Entry;

import java.util.Date;

public class Entry
{
    private String name;
    private Date date;
    private String content;
    private double latitude;
    private double longitude;

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        if (name != null && name != "")
        {
            this.name = name;
        } else
        {
            this.name = this.getDate().toString() + "01";
        }
    }

    public Date getDate()
    {
        return date;
    }

    public void setDate(Date date)
    {
        if (date != null)
        {
            this.date = date;
        }
    }

    public String getContent()
    {
        return content;
    }

    public void setContent(String content)
    {
        if (content != null)
        {
            this.content = content;
        }
    }

    public double getLatitude()
    {
        return latitude;
    }

    public void setLatitude(double latitude)
    {
        this.latitude = latitude;
    }

    public double getLongitude()
    {
        return longitude;
    }

    public void setLongitude(double longitude)
    {
        this.longitude = longitude;
    }

    public Entry(String name, String content, Date date, double longitude, double latitude)
    {
        this.name = name;
        this.content = content;
        this.date = date;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
