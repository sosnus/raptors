package pl.raptors.raptorsRobotsApp.domain.robots;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "status_type")
public class StatusType {
    @Id
    private String id;
    private String name;
    private String description;
    private String symbol;

    public StatusType(String name, String description, String symbol) {
        this.name = name;
        this.description = description;
        this.symbol = symbol;
    }
    public StatusType(String s){
        switch (s){
            case "done":
                this.id="0";
                this.name = s;
                this.description = "zadanie zostało wykonane";
                this.symbol = "✔";
                break;
            case "error":
                this.id="1";
                this.name = s;
                this.description = "zadanie nie zostało wykonane";
                this.symbol = "❌";
                break;
            case "rejected":
                this.id="2";
                this.name = s;
                this.description = "zadanie odrzucone przez dispatchera";
                this.symbol = "⛔";
                break;
            case "warning":
                this.id="3";
                this.name = s;
                this.description = "(przerwane) czyli takie, które się nie przez jakiś wewnętrzny błąd robota (robot wjechał w ścianę albo w przeszkodę i się poddał, \"ZABLOKOWANE\"";
                this.symbol = "⚠";
                break;
            case "new":
                this.id="4";
                this.name = s;
                this.description = "nowe zadanie, czeka na przydział";
                this.symbol = "\uD83C\uDF1F";
                break;
            case "wait":
                this.id="5";
                this.name = s;
                this.description = "zadanie zostało już zaplanowane ale jeszcze robot go nie wykonuje";
                this.symbol = "⏳";
                break;
            case "suspended":
                this.id="6";
                this.name = s;
                this.description = "zadanie jest w buforze ale ma nie być przydzielone (np. ma się wykonać na nowej zmianie, albo czeka aż inne zadanie zostanie wykonane)";
                this.symbol = "\uD83D\uDCA4";
                break;
            case "in-progress":
                this.id="7";
                this.name = s;
                this.description = "robot wykonuje właśnie to zadanie";
                this.symbol = "\uD83D\uDD1B";
                break;
            case "assigned":
                this.id="8";
                this.name = s;
                this.description = "zadanie już przydzielone, robot zaraz zacznie wykonywać zadanie";
                this.symbol = "\uD83D\uDD1C";
                break;
        }
    }

}
