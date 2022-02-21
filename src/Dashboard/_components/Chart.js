import { React, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getObservations } from "../_actions/DashboardActions";

const Chart = () => {
    let pressureObservations = []
    const dispatch = useDispatch();
    const { observations } = useSelector(({ dashboardReducer }) => ({
        observations: dashboardReducer.observations
    }))

    useEffect(() => {
        dispatch(getObservations())
    }, [dispatch, observations]);


    pressureObservations = observations?.map(obs => {
        return {
            "timestamp": new Date(obs.properties.timestamp),
            "shortdate": obs.properties.timestamp.split('T')[0],
            "barometricPressure": obs.properties.barometricPressure.value / 100
        }
    })

    pressureObservations?.sort((a, b) => a.timestamp - b.timestamp)

    return (
        <div style={{ height: '500px' }}>
            Current Pressure: {pressureObservations?.length > 0 ? pressureObservations[pressureObservations.length - 1].barometricPressure : ""}
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={pressureObservations}
                    margin={{
                        top: 5,
                        right: 30,
                        bottom: 50,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="shortdate" fontSize={10} />
                    <YAxis domain={['auto', 'auto']} label={{ value: 'millibar', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />

                    <Line type="monotone" dataKey="barometricPressure" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart
