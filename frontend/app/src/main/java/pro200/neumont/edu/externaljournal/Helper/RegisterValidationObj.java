package pro200.neumont.edu.externaljournal.Helper;

public class RegisterValidationObj
{
    private boolean success;
    private String message;

    public RegisterValidationObj(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }
}
