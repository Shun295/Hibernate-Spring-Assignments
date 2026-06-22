import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
);

const CustomerSpendingChart = ({
    labels,
    amounts
}) => {

    const data = {
        labels,
        datasets: [
            {
                label: "Monthly Spending",
                data: amounts,
                backgroundColor:
                    "rgba(54,162,235,0.6)"
            }
        ]
    };

    return (

        <div className="analytics-card">

            <h4>
                Monthly Spending
            </h4>
            <div
                style={{
                    height: "350px"
                }}
            >
                <Bar
                    data={data}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>

        </div>

    );
};

export default CustomerSpendingChart;