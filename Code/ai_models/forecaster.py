import numpy as np
from sklearn.linear_model import LinearRegression
from typing import List, Dict, Any

class WealthForecaster:
    def __init__(self):
        self.model = LinearRegression()

    def forecast_growth(self, historical_data: List[float], periods: int = 12) -> List[float]:
        """
        Predicts future wealth based on historical net worth values.
        """
        if len(historical_data) < 2:
            return [historical_data[-1] if historical_data else 0] * periods

        # X = months (0, 1, 2, ...), y = net worth
        X = np.array(range(len(historical_data))).reshape(-1, 1)
        y = np.array(historical_data)

        self.model.fit(X, y)

        # Predict next 'periods' months
        future_X = np.array(range(len(historical_data), len(historical_data) + periods)).reshape(-1, 1)
        predictions = self.model.predict(future_X)

        return predictions.tolist()

wealth_forecaster = WealthForecaster()
