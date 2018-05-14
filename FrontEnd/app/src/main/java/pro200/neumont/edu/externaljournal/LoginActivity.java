package pro200.neumont.edu.externaljournal;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.Toast;

public class LoginActivity extends AppCompatActivity
{
    private Button mLoginButton;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        mLoginButton = (Button) findViewById(R.id.login_btn);
        mLoginButton.setOnClickListener((v) -> {
            Toast.makeText(this, "Denied", Toast.LENGTH_SHORT).show();
        });
    }
}
