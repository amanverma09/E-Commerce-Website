import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
const Dashboard = () => {
  const areaChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const areaChartInstance = useRef(null);
  const pieChartInstance = useRef(null);

  useEffect(() => {
    // Initialize charts when component mounts
    if (areaChartRef.current) {
      // Destroy previous chart instance if it exists
      if (areaChartInstance.current) {
        areaChartInstance.current.destroy();
      }

      areaChartInstance.current = new Chart(areaChartRef.current, {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Earnings",
              lineTension: 0.3,
              backgroundColor: "rgba(78, 115, 223, 0.05)",
              borderColor: "rgba(78, 115, 223, 1)",
              pointRadius: 3,
              pointBackgroundColor: "rgba(78, 115, 223, 1)",
              pointBorderColor: "rgba(78, 115, 223, 1)",
              pointHoverRadius: 3,
              pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
              pointHoverBorderColor: "rgba(78, 115, 223, 1)",
              pointHitRadius: 10,
              pointBorderWidth: 2,
              data: [
                0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000,
                25000, 40000,
              ],
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    if (pieChartRef.current) {
      // Destroy previous chart instance if it exists
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }

      pieChartInstance.current = new Chart(pieChartRef.current, {
        type: "doughnut",
        data: {
          labels: ["Direct", "Social", "Referral"],
          datasets: [
            {
              data: [55, 30, 15],
              backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
              hoverBackgroundColor: ["#2e59d9", "#17a673", "#2c9faf"],
              hoverBorderColor: "rgba(234, 236, 244, 1)",
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          cutout: "70%",
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }

    // Clean up function to destroy charts when component unmounts
    return () => {
      if (areaChartInstance.current) {
        areaChartInstance.current.destroy();
      }
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="container-fluid p-4">
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="bi bi-download me-1"></i> Generate Report
        </a>
      </div>

      {/* Content Row */}
      <div className="row">
        {/* Earnings (Monthly) Card */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card dashboard-card stat-card border-0">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-white text-uppercase mb-1">
                    Earnings (Monthly)
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-white">
                    $40,000
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-calendar text-white fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Earnings (Annual) Card */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card dashboard-card border-0">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-dark text-uppercase mb-1">
                    Earnings (Annual)
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    $215,000
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-currency-dollar text-primary fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card dashboard-card border-0">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-dark text-uppercase mb-1">
                    Products
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    350
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-box text-success fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Requests Card */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card dashboard-card border-0">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-dark text-uppercase mb-1">
                    Pending Requests
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    18
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-chat-left-text text-warning fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Row */}
      <div className="row">
        {/* Area Chart */}
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow mb-4 dashboard-card">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Earnings Overview
              </h6>
              <div className="dropdown no-arrow">
                <a
                  className="dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-three-dots-vertical"></i>
                </a>
              </div>
            </div>
            <div className="card-body">
              <div className="chart-container">
                <canvas ref={areaChartRef} id="myAreaChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4 dashboard-card">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Revenue Sources
              </h6>
              <div className="dropdown no-arrow">
                <a
                  className="dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-three-dots-vertical"></i>
                </a>
              </div>
            </div>
            <div className="card-body">
              <div className="chart-container">
                <canvas ref={pieChartRef} id="myPieChart"></canvas>
              </div>
              <div className="mt-4 text-center small">
                <span className="mr-2">
                  <i className="bi bi-circle-fill text-primary"></i> Direct
                </span>
                <span className="mr-2">
                  <i className="bi bi-circle-fill text-success"></i> Social
                </span>
                <span className="mr-2">
                  <i className="bi bi-circle-fill text-info"></i> Referral
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Row */}
      <div className="row">
        {/* Recent Orders */}
        <div className="col-12">
          <div className="card shadow mb-4 dashboard-card">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Recent Orders
              </h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  width="100%"
                  cellSpacing="0"
                >
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Product</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#ORD-0001</td>
                      <td>iPhone 13 Pro</td>
                      <td>John Doe</td>
                      <td>2023-05-15</td>
                      <td>$999.00</td>
                      <td>
                        <span className="badge bg-success">Completed</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary">View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>#ORD-0002</td>
                      <td>MacBook Air</td>
                      <td>Jane Smith</td>
                      <td>2023-05-14</td>
                      <td>$1,199.00</td>
                      <td>
                        <span className="badge bg-warning">Pending</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary">View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>#ORD-0003</td>
                      <td>AirPods Pro</td>
                      <td>Robert Johnson</td>
                      <td>2023-05-13</td>
                      <td>$249.00</td>
                      <td>
                        <span className="badge bg-success">Completed</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary">View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>#ORD-0004</td>
                      <td>iPad Mini</td>
                      <td>Emily Davis</td>
                      <td>2023-05-12</td>
                      <td>$499.00</td>
                      <td>
                        <span className="badge bg-danger">Cancelled</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary">View</button>
                      </td>
                    </tr>
                    <tr>
                      <td>#ORD-0005</td>
                      <td>Apple Watch</td>
                      <td>Michael Wilson</td>
                      <td>2023-05-11</td>
                      <td>$399.00</td>
                      <td>
                        <span className="badge bg-success">Completed</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary">View</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
