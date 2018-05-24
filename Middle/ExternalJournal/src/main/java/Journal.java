import java.util.List;

public class Journal
{
    private List<Entry> entries;
    private String name;
    private int id;

    public List<Entry> getEntries()
    {
        return entries;
    }

    public void setEntries(List<Entry> entries)
    {
        this.entries = entries;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public Journal(List<Entry> entries, String name, int id)
    {
        this.entries = entries;
        this.name = name;
        this.id = id;

    }
}