package pro200.neumont.edu.externaljournal.Activities;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import pro200.neumont.edu.externaljournal.R;

    public class LoginActivity extends AppCompatActivity
{
    private Button mLoginButton;
    private EditText username;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        mLoginButton = (Button) findViewById(R.id.login_btn);
        mLoginButton.setOnClickListener((v) -> {
            Toast.makeText(this, "Denied", Toast.LENGTH_SHORT).show();
        });
        username = (EditText) findViewById(R.id.username_edit_text);
        username.getText().toString();
    }
}
