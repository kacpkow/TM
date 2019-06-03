package com.example.kacper.infoviewer;

import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import org.w3c.dom.Text;

public class SettingsActivity extends AppCompatActivity {

    private TextView changeRate;
    private LinearLayout changeRateLayout;

    private int currentRate = 5;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);

        changeRateLayout = (LinearLayout) findViewById(R.id.changeRateLayout);
        changeRate = (TextView)findViewById(R.id.changeRateValue);

        changeRateLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                switch(currentRate){
                    case 5:
                        currentRate = 10;
                        changeRateValue(currentRate);
                        break;
                    case 10:
                        currentRate = 20;
                        changeRateValue(currentRate);
                        break;
                    case 20:
                        currentRate = 30;
                        changeRateValue(currentRate);
                        break;
                    case 30:
                        currentRate = 40;
                        changeRateValue(currentRate);
                        break;
                    case 40:
                        currentRate = 50;
                        changeRateValue(currentRate);
                        break;
                    case 50:
                        currentRate = 60;
                        changeRateValue(currentRate);
                        break;
                    case 60:
                        currentRate = 5;
                        changeRateValue(currentRate);
                        break;

                }
                changeRate.setText(String.valueOf(currentRate) + " sekund");
            }
        });

    }

    private void changeRateValue(Integer mode) {
        SharedPreferences sp = getSharedPreferences("SETTINGS", MODE_PRIVATE);
        SharedPreferences.Editor ed = sp.edit();
        ed.putInt("CHANGE_RATE", mode);
        ed.commit();
    }


    @Override
    public void onResume(){
        super.onResume();
        SharedPreferences sp = getSharedPreferences("SETTINGS", MODE_PRIVATE);
        int changeRateValue = sp.getInt("CHANGE_RATE", 5);
        currentRate = changeRateValue;
        changeRate.setText(String.valueOf(changeRateValue) + " sekund");
    }
}
