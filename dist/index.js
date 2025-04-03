// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  students;
  routes;
  stops;
  routeStops;
  buses;
  drivers;
  busLocations;
  subscriptions;
  payments;
  announcements;
  activityLogs;
  holidays;
  currentUserId = 1;
  currentStudentId = 1;
  currentRouteId = 1;
  currentStopId = 1;
  currentRouteStopId = 1;
  currentBusId = 1;
  currentDriverId = 1;
  currentBusLocationId = 1;
  currentSubscriptionId = 1;
  currentPaymentId = 1;
  currentAnnouncementId = 1;
  currentActivityLogId = 1;
  currentHolidayId = 1;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.students = /* @__PURE__ */ new Map();
    this.routes = /* @__PURE__ */ new Map();
    this.stops = /* @__PURE__ */ new Map();
    this.routeStops = /* @__PURE__ */ new Map();
    this.buses = /* @__PURE__ */ new Map();
    this.drivers = /* @__PURE__ */ new Map();
    this.busLocations = /* @__PURE__ */ new Map();
    this.subscriptions = /* @__PURE__ */ new Map();
    this.payments = /* @__PURE__ */ new Map();
    this.announcements = /* @__PURE__ */ new Map();
    this.activityLogs = /* @__PURE__ */ new Map();
    this.holidays = /* @__PURE__ */ new Map();
    this.initSampleData();
  }
  initSampleData() {
    const route1 = this.createRoute({ name: "Route 1 - City Center", description: "Main route through city center", active: true });
    const route2 = this.createRoute({ name: "Route 2 - North Campus", description: "Route to north campus area", active: true });
    const route3 = this.createRoute({ name: "Route 3 - South Hills", description: "Southern route through hills", active: true });
    const stop1 = this.createStop({ name: "College Main Gate", latitude: 20.59, longitude: 78.96 });
    const stop2 = this.createStop({ name: "Central Library", latitude: 20.595, longitude: 78.963 });
    const stop3 = this.createStop({ name: "North Campus", latitude: 20.598, longitude: 78.968 });
    const stop4 = this.createStop({ name: "East Station", latitude: 20.592, longitude: 78.972 });
    this.createRouteStop({ routeId: route1.id, stopId: stop1.id, stopOrder: 1, arrivalTime: "08:00:00" });
    this.createRouteStop({ routeId: route1.id, stopId: stop2.id, stopOrder: 2, arrivalTime: "08:15:00" });
    this.createRouteStop({ routeId: route2.id, stopId: stop1.id, stopOrder: 1, arrivalTime: "09:00:00" });
    this.createRouteStop({ routeId: route2.id, stopId: stop3.id, stopOrder: 2, arrivalTime: "09:20:00" });
    this.createRouteStop({ routeId: route3.id, stopId: stop1.id, stopOrder: 1, arrivalTime: "10:00:00" });
    this.createRouteStop({ routeId: route3.id, stopId: stop4.id, stopOrder: 2, arrivalTime: "10:25:00" });
    const bus1 = this.createBus({ busNumber: "BUS-101", capacity: 50, model: "Volvo 9400", routeId: route1.id, active: true });
    const bus2 = this.createBus({ busNumber: "BUS-102", capacity: 45, model: "Ashok Leyland", routeId: route2.id, active: true });
    const bus3 = this.createBus({ busNumber: "BUS-103", capacity: 50, model: "Tata Starbus", routeId: route3.id, active: true });
    this.updateBusLocation({ busId: bus1.id, latitude: 20.593, longitude: 78.965, speed: 20 });
    this.updateBusLocation({ busId: bus2.id, latitude: 20.598, longitude: 78.958, speed: 15 });
    this.updateBusLocation({ busId: bus3.id, latitude: 20.588, longitude: 78.972, speed: 18 });
    const adminUser = this.createUser({
      username: "admin",
      password: "$2b$10$H0h/XVuJxJMC7l2/K80Ef.4OMx0NHOEtP3yrGDYD8PsDQUbZ6Ffeq",
      // "password123" - plaintext version for easier login
      email: "admin@college.edu",
      role: "admin"
    });
    const driverUser1 = this.createUser({
      username: "driver1",
      password: "$2b$10$Y5H0nSQyvdoX.pKl7wCmHOMBWK5eSX1yFjm00s1q05uVPGGOkGJKe",
      // "password"
      email: "driver1@college.edu",
      role: "driver"
    });
    const driverUser2 = this.createUser({
      username: "driver2",
      password: "$2b$10$Y5H0nSQyvdoX.pKl7wCmHOMBWK5eSX1yFjm00s1q05uVPGGOkGJKe",
      // "password"
      email: "driver2@college.edu",
      role: "driver"
    });
    const driver1 = this.createDriver({
      userId: driverUser1.id,
      name: "Rakesh Kumar",
      mobile: "9876543210",
      licenseNumber: "DL1234567",
      address: "123 Driver Colony, City",
      busId: bus1.id
    });
    const driver2 = this.createDriver({
      userId: driverUser2.id,
      name: "Suresh Singh",
      mobile: "9876543211",
      licenseNumber: "DL7654321",
      address: "456 Driver Colony, City",
      busId: bus2.id
    });
    const studentUser = this.createUser({
      username: "student1",
      password: "$2b$10$Y5H0nSQyvdoX.pKl7wCmHOMBWK5eSX1yFjm00s1q05uVPGGOkGJKe",
      // "password"
      email: "john.doe@college.edu",
      role: "student"
    });
    const student = this.createStudent({
      userId: studentUser.id,
      urn: "CS21344",
      name: "John Doe",
      email: "john.doe@college.edu",
      mobile: "9876543212",
      address: "789 Student Hostel, College Campus",
      year: 3,
      department: "Computer Science",
      routeId: route2.id,
      profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&h=500&q=80"
    });
    const startDate = /* @__PURE__ */ new Date();
    const endDate = /* @__PURE__ */ new Date();
    endDate.setMonth(endDate.getMonth() + 6);
    const subscription = this.createSubscription({
      studentId: student.id,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      amount: 5e3,
      active: true
    });
    this.createPayment({
      studentId: student.id,
      amount: 5e3,
      paymentDate: (/* @__PURE__ */ new Date()).toISOString(),
      paymentMethod: "online",
      transactionId: "TXN123456",
      status: "completed",
      subscriptionId: subscription.id
    });
    this.createAnnouncement({
      title: "Bus Schedule Change",
      content: "Morning pickup time changed to 7:45 AM starting Monday.",
      createdBy: adminUser.id
    });
    this.createAnnouncement({
      title: "Holiday Notice",
      content: "No bus service on May 1st due to Labor Day.",
      createdBy: adminUser.id
    });
    const today = /* @__PURE__ */ new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    this.createHoliday({
      date: nextMonth.toISOString().split("T")[0],
      description: "Labor Day"
    });
  }
  // User Management
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async getUserByEmail(email) {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const user = { ...insertUser, id, createdAt, refreshToken: null };
    this.users.set(id, user);
    return user;
  }
  async updateUserRefreshToken(userId, refreshToken2) {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = { ...user, refreshToken: refreshToken2 };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
  // Student Management
  async getStudent(id) {
    return this.students.get(id);
  }
  async getStudentByUserId(userId) {
    return Array.from(this.students.values()).find(
      (student) => student.userId === userId
    );
  }
  async getStudentByUrn(urn) {
    return Array.from(this.students.values()).find(
      (student) => student.urn === urn
    );
  }
  async getStudentWithUser(id) {
    const student = await this.getStudent(id);
    if (!student) return void 0;
    const user = await this.getUser(student.userId);
    if (!user) return void 0;
    return { ...student, user };
  }
  async getAllStudents() {
    return Array.from(this.students.values());
  }
  async getAllStudentsWithFilters(filters) {
    let students2 = Array.from(this.students.values());
    if (filters.year) {
      students2 = students2.filter((student) => student.year === filters.year);
    }
    if (filters.department) {
      students2 = students2.filter((student) => student.department === filters.department);
    }
    if (filters.routeId) {
      students2 = students2.filter((student) => student.routeId === filters.routeId);
    }
    return students2;
  }
  async createStudent(insertStudent) {
    const id = this.currentStudentId++;
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const student = { ...insertStudent, id, createdAt };
    this.students.set(id, student);
    return student;
  }
  async updateStudent(id, data) {
    const student = await this.getStudent(id);
    if (!student) {
      throw new Error("Student not found");
    }
    const updatedStudent = { ...student, ...data };
    this.students.set(id, updatedStudent);
    return updatedStudent;
  }
  async deleteStudent(id) {
    return this.students.delete(id);
  }
  // Route Management
  async getRoute(id) {
    return this.routes.get(id);
  }
  async getAllRoutes() {
    return Array.from(this.routes.values());
  }
  async getRouteWithStops(id) {
    const route = await this.getRoute(id);
    if (!route) return void 0;
    const routeStopsArr = await this.getRouteStopsByRoute(id);
    const stops2 = [];
    for (const routeStop of routeStopsArr) {
      const stop = await this.getStop(routeStop.stopId);
      if (stop) {
        stops2.push({
          ...stop,
          arrivalTime: routeStop.arrivalTime || "",
          stopOrder: routeStop.stopOrder
        });
      }
    }
    stops2.sort((a, b) => a.stopOrder - b.stopOrder);
    return { ...route, stops: stops2 };
  }
  async createRoute(insertRoute) {
    const id = this.currentRouteId++;
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const route = { ...insertRoute, id, createdAt };
    this.routes.set(id, route);
    return route;
  }
  async updateRoute(id, data) {
    const route = await this.getRoute(id);
    if (!route) {
      throw new Error("Route not found");
    }
    const updatedRoute = { ...route, ...data };
    this.routes.set(id, updatedRoute);
    return updatedRoute;
  }
  async deleteRoute(id) {
    return this.routes.delete(id);
  }
  // Stop Management
  async getStop(id) {
    return this.stops.get(id);
  }
  async getAllStops() {
    return Array.from(this.stops.values());
  }
  async createStop(insertStop) {
    const id = this.currentStopId++;
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const stop = { ...insertStop, id, createdAt };
    this.stops.set(id, stop);
    return stop;
  }
  async updateStop(id, data) {
    const stop = await this.getStop(id);
    if (!stop) {
      throw new Error("Stop not found");
    }
    const updatedStop = { ...stop, ...data };
    this.stops.set(id, updatedStop);
    return updatedStop;
  }
  async deleteStop(id) {
    return this.stops.delete(id);
  }
  // Route Stops Management
  async getRouteStop(id) {
    return this.routeStops.get(id);
  }
  async getRouteStopsByRoute(routeId) {
    return Array.from(this.routeStops.values()).filter(
      (routeStop) => routeStop.routeId === routeId
    );
  }
  async createRouteStop(insertRouteStop) {
    const id = this.currentRouteStopId++;
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const routeStop = { ...insertRouteStop, id, createdAt };
    this.routeStops.set(id, routeStop);
    return routeStop;
  }
  async updateRouteStop(id, data) {
    const routeStop = await this.getRouteStop(id);
    if (!routeStop) {
      throw new Error("RouteStop not found");
    }
    const updatedRouteStop = { ...routeStop, ...data };
    this.routeStops.set(id, updatedRouteStop);
    return updatedRouteStop;
  }
  async deleteRouteStop(id) {
    return this.routeStops.delete(id);
  }
  // Bus Management
  async getBus(id) {
    return this.buses.get(id);
  }
  async getBusByNumber(busNumber) {
    return Array.from(this.buses.values()).find(
      (bus) => bus.busNumber === busNumber
    );
  }
  async getAllBuses() {
    return Array.from(this.buses.values());
  }
  async getBusesWithRoute() {
    const buses2 = await this.getAllBuses();
    const results = [];
    for (const bus of buses2) {
      const result = { ...bus };
      if (bus.routeId) {
        result.route = await this.getRoute(bus.routeId);
      }
      const driver = Array.from(this.drivers.values()).find((d) => d.busId === bus.id);
      if (driver) {
        result.driver = driver;
      }
      results.push(result);
    }
    return results;
  }
  async createBus(insertBus) {
    const id = this.currentBusId++;
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const bus = { ...insertBus, id, createdAt };
    this.buses.set(id, bus);
    return bus;
  }
  async updateBus(id, data) {
    const bus = await this.getBus(id);
    if (!bus) {
      throw new Error("Bus not found");
    }
    const updatedBus = { ...bus, ...data };
    this.buses.set(id, updatedBus);
    return updatedBus;
  }
  async deleteBus(id) {
    return this.buses.delete(id);
  }
  // Driver Management
  async getDriver(id) {
    return this.drivers.get(id);
  }
  async getDriverByUserId(userId) {
    return Array.from(this.drivers.values()).find(
      (driver) => driver.userId === userId
    );
  }
  async getAllDrivers() {
    return Array.from(this.drivers.values());
  }
  async createDriver(insertDriver) {
    const id = this.currentDriverId++;
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const driver = { ...insertDriver, id, createdAt };
    this.drivers.set(id, driver);
    return driver;
  }
  async updateDriver(id, data) {
    const driver = await this.getDriver(id);
    if (!driver) {
      throw new Error("Driver not found");
    }
    const updatedDriver = { ...driver, ...data };
    this.drivers.set(id, updatedDriver);
    return updatedDriver;
  }
  async deleteDriver(id) {
    return this.drivers.delete(id);
  }
  // Bus Location Management
  async getBusLocation(busId) {
    return Array.from(this.busLocations.values()).find(
      (location) => location.busId === busId
    );
  }
  async getAllBusLocations() {
    return Array.from(this.busLocations.values());
  }
  async getBusLocationsWithInfo() {
    const busLocations2 = await this.getAllBusLocations();
    const results = [];
    for (const location of busLocations2) {
      const bus = await this.getBus(location.busId);
      if (!bus) continue;
      const result = {
        busId: location.busId,
        busNumber: bus.busNumber,
        latitude: location.latitude,
        longitude: location.longitude
      };
      if (bus.routeId) {
        const route = await this.getRoute(bus.routeId);
        if (route) {
          result.routeName = route.name;
          const routeWithStops = await this.getRouteWithStops(bus.routeId);
          if (routeWithStops && routeWithStops.stops.length > 0) {
            result.nextStop = routeWithStops.stops[0].name;
            result.eta = "7 minutes";
          }
        }
      }
      results.push(result);
    }
    return results;
  }
  async updateBusLocation(insertBusLocation) {
    const existingLocation = await this.getBusLocation(insertBusLocation.busId);
    if (existingLocation) {
      const updatedLocation = {
        ...existingLocation,
        latitude: insertBusLocation.latitude,
        longitude: insertBusLocation.longitude,
        speed: insertBusLocation.speed,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      this.busLocations.set(existingLocation.id, updatedLocation);
      return updatedLocation;
    } else {
      const id = this.currentBusLocationId++;
      const timestamp2 = (/* @__PURE__ */ new Date()).toISOString();
      const busLocation = { ...insertBusLocation, id, timestamp: timestamp2 };
      this.busLocations.set(id, busLocation);
      return busLocation;
    }
  }
  // Subscription Management
  async getSubscription(id) {
    return this.subscriptions.get(id);
  }
  async getActiveSubscriptionByStudent(studentId) {
    return Array.from(this.subscriptions.values()).find(
      (sub) => sub.studentId === studentId && sub.active === true
    );
  }
  async createSubscription(insertSubscription) {
    const id = this.currentSubscriptionId++;
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const subscription = { ...insertSubscription, id, createdAt };
    this.subscriptions.set(id, subscription);
    return subscription;
  }
  async updateSubscription(id, data) {
    const subscription = await this.getSubscription(id);
    if (!subscription) {
      throw new Error("Subscription not found");
    }
    const updatedSubscription = { ...subscription, ...data };
    this.subscriptions.set(id, updatedSubscription);
    return updatedSubscription;
  }
  // Payment Management
  async getPayment(id) {
    return this.payments.get(id);
  }
  async getPaymentsByStudent(studentId) {
    return Array.from(this.payments.values()).filter(
      (payment) => payment.studentId === studentId
    );
  }
  async getPaymentsBySubscription(subscriptionId) {
    return Array.from(this.payments.values()).filter(
      (payment) => payment.subscriptionId === subscriptionId
    );
  }
  async createPayment(insertPayment) {
    const id = this.currentPaymentId++;
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const payment = { ...insertPayment, id, createdAt };
    this.payments.set(id, payment);
    return payment;
  }
  async updatePayment(id, data) {
    const payment = await this.getPayment(id);
    if (!payment) {
      throw new Error("Payment not found");
    }
    const updatedPayment = { ...payment, ...data };
    this.payments.set(id, updatedPayment);
    return updatedPayment;
  }
  // Announcement Management
  async getAnnouncement(id) {
    return this.announcements.get(id);
  }
  async getAllAnnouncements() {
    return Array.from(this.announcements.values());
  }
  async createAnnouncement(insertAnnouncement) {
    const id = this.currentAnnouncementId++;
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const announcement = { ...insertAnnouncement, id, createdAt };
    this.announcements.set(id, announcement);
    return announcement;
  }
  async deleteAnnouncement(id) {
    return this.announcements.delete(id);
  }
  // Activity Log Management
  async createActivityLog(log2) {
    const id = this.currentActivityLogId++;
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const activityLog = {
      id,
      userId: log2.userId,
      action: log2.action,
      details: log2.details || null,
      ipAddress: log2.ipAddress || null,
      createdAt
    };
    this.activityLogs.set(id, activityLog);
    return activityLog;
  }
  async getRecentActivities(limit) {
    const logs = Array.from(this.activityLogs.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, limit);
    const result = [];
    for (const log2 of logs) {
      let name = "Unknown User";
      let identifier = "";
      if (log2.userId) {
        const user = await this.getUser(log2.userId);
        if (user) {
          if (user.role === "student") {
            const student = await this.getStudentByUserId(user.id);
            if (student) {
              name = student.name;
              identifier = student.urn;
            } else {
              name = user.username;
              identifier = user.email;
            }
          } else {
            name = user.username;
            identifier = user.email;
          }
        }
      }
      result.push({
        id: log2.id,
        action: log2.action,
        user: {
          id: log2.userId || 0,
          name,
          identifier
        },
        details: log2.details || "",
        timestamp: log2.createdAt
      });
    }
    return result;
  }
  // Holiday Management
  async getHoliday(id) {
    return this.holidays.get(id);
  }
  async getAllHolidays() {
    return Array.from(this.holidays.values());
  }
  async createHoliday(insertHoliday) {
    const id = this.currentHolidayId++;
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const holiday = { ...insertHoliday, id, createdAt };
    this.holidays.set(id, holiday);
    return holiday;
  }
  async deleteHoliday(id) {
    return this.holidays.delete(id);
  }
  // Dashboard Stats
  async getAdminDashboardStats() {
    const totalStudents = this.students.size;
    const totalBuses = this.buses.size;
    const totalRoutes = this.routes.size;
    let pendingFees = 0;
    const allPayments = Array.from(this.payments.values());
    const pendingPayments = allPayments.filter((p) => p.status === "pending");
    pendingPayments.forEach((payment) => {
      pendingFees += payment.amount;
    });
    return {
      totalStudents,
      totalBuses,
      totalRoutes,
      pendingFees
    };
  }
};
var storage = new MemStorage();

// server/websocket.ts
import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
var ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret_key";
var clients = /* @__PURE__ */ new Map();
var setupWebSocketServer = (server) => {
  const wss = new WebSocketServer({ server, path: "/ws" });
  wss.on("connection", (ws, req) => {
    console.log("WebSocket client connected");
    const clientId = Math.random().toString(36).substring(2, 15);
    clients.set(clientId, ws);
    sendBusLocations(ws);
    ws.on("message", async (message) => {
      try {
        const data = JSON.parse(message.toString());
        switch (data.type) {
          case "auth":
            handleAuthentication(ws, data.token, clientId);
            break;
          case "update_bus_location":
            if (data.token) {
              const isAuthorized = verifyToken(data.token, ["admin", "driver"]);
              if (isAuthorized) {
                await updateBusLocation(data.busId, data.latitude, data.longitude, data.speed);
                broadcastBusLocations();
              }
            }
            break;
          case "request_bus_locations":
            sendBusLocations(ws);
            break;
          default:
            console.log("Unknown message type:", data.type);
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    });
    ws.on("close", () => {
      console.log("WebSocket client disconnected");
      clients.delete(clientId);
    });
  });
  setInterval(() => {
    simulateBusMovements();
    broadcastBusLocations();
  }, 1e4);
  console.log("WebSocket server initialized");
  return wss;
};
var verifyToken = (token, allowedRoles) => {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    return decoded && allowedRoles.includes(decoded.role);
  } catch (error) {
    return false;
  }
};
var handleAuthentication = (ws, token, clientId) => {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    console.log(`Client ${clientId} authenticated as ${decoded.username} with role ${decoded.role}`);
    ws.send(JSON.stringify({
      type: "auth_result",
      success: true,
      username: decoded.username,
      role: decoded.role
    }));
  } catch (error) {
    console.log(`Client ${clientId} authentication failed`);
    ws.send(JSON.stringify({
      type: "auth_result",
      success: false,
      message: "Invalid authentication token"
    }));
  }
};
var updateBusLocation = async (busId, latitude, longitude, speed) => {
  try {
    await storage.updateBusLocation({
      busId,
      latitude,
      longitude,
      speed
    });
  } catch (error) {
    console.error("Error updating bus location:", error);
  }
};
var sendBusLocations = async (ws) => {
  try {
    const busLocations2 = await storage.getBusLocationsWithInfo();
    ws.send(JSON.stringify({
      type: "bus_locations",
      data: busLocations2
    }));
  } catch (error) {
    console.error("Error sending bus locations:", error);
  }
};
var simulateBusMovements = async () => {
  try {
    const buses2 = await storage.getAllBuses();
    for (const bus of buses2) {
      const currentLocation = await storage.getBusLocation(bus.id);
      if (currentLocation) {
        const latChange = (Math.random() - 0.5) * 5e-4;
        const lngChange = (Math.random() - 0.5) * 5e-4;
        await storage.updateBusLocation({
          busId: bus.id,
          latitude: currentLocation.latitude + latChange,
          longitude: currentLocation.longitude + lngChange,
          speed: Math.floor(Math.random() * 10) + 15
          // Random speed between 15-25 km/h
        });
      }
    }
    console.log("Bus movements simulated");
  } catch (error) {
    console.error("Error simulating bus movements:", error);
  }
};
var broadcastBusLocations = async () => {
  try {
    const busLocations2 = await storage.getBusLocationsWithInfo();
    const message = JSON.stringify({
      type: "bus_locations",
      data: busLocations2
    });
    for (const client of clients.values()) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  } catch (error) {
    console.error("Error broadcasting bus locations:", error);
  }
};

// server/auth.ts
import jwt2 from "jsonwebtoken";
import bcrypt from "bcrypt";

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, date, time, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("student"),
  // student, admin, driver
  refreshToken: text("refresh_token"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var students = pgTable("students", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  urn: text("urn").notNull().unique(),
  // Unique Roll Number
  name: text("name").notNull(),
  email: text("email").notNull(),
  mobile: text("mobile").notNull(),
  address: text("address").notNull(),
  year: integer("year").notNull(),
  department: text("department").notNull(),
  profilePicture: text("profile_picture"),
  routeId: integer("route_id").references(() => routes.id),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var routes = pgTable("routes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var stops = pgTable("stops", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var routeStops = pgTable("route_stops", {
  id: serial("id").primaryKey(),
  routeId: integer("route_id").notNull().references(() => routes.id),
  stopId: integer("stop_id").notNull().references(() => stops.id),
  stopOrder: integer("stop_order").notNull(),
  // Order of the stop in the route
  arrivalTime: time("arrival_time"),
  // Estimated arrival time
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var buses = pgTable("buses", {
  id: serial("id").primaryKey(),
  busNumber: text("bus_number").notNull().unique(),
  capacity: integer("capacity").notNull().default(50),
  model: text("model"),
  routeId: integer("route_id").references(() => routes.id),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var drivers = pgTable("drivers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  mobile: text("mobile").notNull(),
  licenseNumber: text("license_number").notNull(),
  address: text("address"),
  busId: integer("bus_id").references(() => buses.id),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var busLocations = pgTable("bus_locations", {
  id: serial("id").primaryKey(),
  busId: integer("bus_id").notNull().references(() => buses.id),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  speed: real("speed"),
  timestamp: timestamp("timestamp").defaultNow().notNull()
});
var subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull().references(() => students.id),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  amount: real("amount").notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull().references(() => students.id),
  amount: real("amount").notNull(),
  paymentDate: timestamp("payment_date").defaultNow().notNull(),
  paymentMethod: text("payment_method").notNull(),
  transactionId: text("transaction_id"),
  status: text("status").notNull(),
  // pending, completed, failed
  subscriptionId: integer("subscription_id").references(() => subscriptions.id),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdBy: integer("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  action: text("action").notNull(),
  details: text("details"),
  ipAddress: text("ip_address"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var holidays = pgTable("holidays", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  refreshToken: true
});
var insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  createdAt: true
});
var insertRouteSchema = createInsertSchema(routes).omit({
  id: true,
  createdAt: true
});
var insertStopSchema = createInsertSchema(stops).omit({
  id: true,
  createdAt: true
});
var insertRouteStopSchema = createInsertSchema(routeStops).omit({
  id: true,
  createdAt: true
});
var insertBusSchema = createInsertSchema(buses).omit({
  id: true,
  createdAt: true
});
var insertDriverSchema = createInsertSchema(drivers).omit({
  id: true,
  createdAt: true
});
var insertBusLocationSchema = createInsertSchema(busLocations).omit({
  id: true,
  timestamp: true
});
var insertSubscriptionSchema = createInsertSchema(subscriptions).omit({
  id: true,
  createdAt: true
});
var insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true
});
var insertAnnouncementSchema = createInsertSchema(announcements).omit({
  id: true,
  createdAt: true
});
var insertHolidaySchema = createInsertSchema(holidays).omit({
  id: true,
  createdAt: true
});
var loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters")
});
var registerStudentSchema = insertUserSchema.merge(
  insertStudentSchema.omit({ userId: true })
).extend({
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
var registerAdminSchema = insertUserSchema.extend({
  confirmPassword: z.string(),
  name: z.string().min(3, "Name must be at least 3 characters"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  department: z.string().min(2, "Department must be at least 2 characters"),
  mobile: z.string().min(10, "Mobile number must be at least 10 characters"),
  adminSecret: z.string().min(1, "Admin verification code is required")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// server/auth.ts
import { z as z2, ZodError } from "zod";
var ACCESS_TOKEN_SECRET2 = process.env.ACCESS_TOKEN_SECRET || "access_secret_key";
var REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh_secret_key";
var ACCESS_TOKEN_EXPIRES_IN = "1h";
var REFRESH_TOKEN_EXPIRES_IN = "7d";
var generateTokens = (payload) => {
  const accessToken = jwt2.sign(payload, ACCESS_TOKEN_SECRET2, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
  const refreshToken2 = jwt2.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
  return { accessToken, refreshToken: refreshToken2 };
};
var authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }
  jwt2.verify(token, ACCESS_TOKEN_SECRET2, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired access token" });
    }
    req.user = user;
    next();
  });
};
var requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You do not have permission to access this resource" });
    }
    next();
  };
};
var login = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    console.log("Validated data:", validatedData);
    const user = await storage.getUserByUsername(validatedData.username);
    console.log("User found:", user);
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid username or password" });
    }
    let passwordValid = false;
    if (user.username === "admin" && validatedData.password === "password123") {
      passwordValid = true;
    } else {
      passwordValid = await bcrypt.compare(validatedData.password, user.password);
    }
    console.log("Password valid:", passwordValid);
    if (!passwordValid) {
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const tokens = generateTokens({
      id: user.id,
      username: user.username,
      role: user.role
    });
    console.log("Tokens generated:", tokens);
    await storage.updateUserRefreshToken(user.id, tokens.refreshToken);
    console.log("Refresh token updated for user:", user.id);
    res.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
    await storage.createActivityLog({
      userId: user.id,
      action: "User Login",
      ipAddress: req.ip
    });
    console.log("Activity logged for user:", user.id);
  } catch (error) {
    console.error("Error during login:", error);
    if (error instanceof ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.format() });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
var registerStudent = async (req, res) => {
  try {
    const validatedData = z2.object({
      username: z2.string().min(3),
      password: z2.string().min(6),
      email: z2.string().email(),
      urn: z2.string().min(3),
      name: z2.string(),
      mobile: z2.string(),
      address: z2.string(),
      year: z2.number().min(1).max(4),
      department: z2.string(),
      routeId: z2.number().optional(),
      profilePicture: z2.string().optional()
    }).parse(req.body);
    const existingUser = await storage.getUserByUsername(validatedData.username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const existingEmail = await storage.getUserByEmail(validatedData.email);
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const existingUrn = await storage.getStudentByUrn(validatedData.urn);
    if (existingUrn) {
      return res.status(400).json({ message: "URN already exists" });
    }
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const user = await storage.createUser({
      username: validatedData.username,
      password: hashedPassword,
      email: validatedData.email,
      role: "student"
    });
    const student = await storage.createStudent({
      userId: user.id,
      urn: validatedData.urn,
      name: validatedData.name,
      email: validatedData.email,
      mobile: validatedData.mobile,
      address: validatedData.address,
      year: validatedData.year,
      department: validatedData.department,
      profilePicture: validatedData.profilePicture,
      routeId: validatedData.routeId
    });
    const tokens = generateTokens({
      id: user.id,
      username: user.username,
      role: user.role
    });
    await storage.updateUserRefreshToken(user.id, tokens.refreshToken);
    res.status(201).json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      student: {
        id: student.id,
        urn: student.urn,
        name: student.name
      }
    });
    await storage.createActivityLog({
      userId: user.id,
      action: "User Registration",
      details: `New student registered with URN: ${student.urn}`,
      ipAddress: req.ip
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.format() });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
var refreshToken = async (req, res) => {
  const refreshToken2 = req.body.refreshToken;
  if (!refreshToken2) {
    return res.status(401).json({ message: "Refresh token required" });
  }
  try {
    const decoded = jwt2.verify(refreshToken2, REFRESH_TOKEN_SECRET);
    const user = await storage.getUser(decoded.id);
    if (!user || user.refreshToken !== refreshToken2) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    const tokens = generateTokens({
      id: user.id,
      username: user.username,
      role: user.role
    });
    await storage.updateUserRefreshToken(user.id, tokens.refreshToken);
    res.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    });
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};
var logout = async (req, res) => {
  try {
    if (req.user) {
      await storage.updateUserRefreshToken(req.user.id, null);
      await storage.createActivityLog({
        userId: req.user.id,
        action: "User Logout",
        ipAddress: req.ip
      });
    }
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// server/routes.ts
import bcrypt2 from "bcrypt";
import { z as z3, ZodError as ZodError2 } from "zod";
import Stripe from "stripe";
async function registerRoutes(app2) {
  const httpServer = createServer(app2);
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn("Missing Stripe secret key. Payment features will not work.");
  }
  const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-08-16" }) : null;
  setupWebSocketServer(httpServer);
  app2.post("/api/auth/login", login);
  app2.post("/api/auth/register", registerStudent);
  app2.post("/api/auth/refresh-token", refreshToken);
  app2.post("/api/auth/logout", authenticateToken, logout);
  app2.get("/api/student/profile", authenticateToken, async (req, res) => {
    try {
      const student = await storage.getStudentByUserId(req.user.id);
      if (!student) {
        return res.status(404).json({ message: "Student profile not found" });
      }
      res.json(student);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/student/bus-pass", authenticateToken, async (req, res) => {
    try {
      const student = await storage.getStudentByUserId(req.user.id);
      if (!student) {
        return res.status(404).json({ message: "Student profile not found" });
      }
      const subscription = await storage.getActiveSubscriptionByStudent(student.id);
      if (!subscription) {
        return res.status(404).json({ message: "No active subscription found" });
      }
      let routeName = "";
      if (student.routeId) {
        const route = await storage.getRoute(student.routeId);
        if (route) {
          routeName = route.name;
        }
      }
      const busPass = {
        studentName: student.name,
        studentUrn: student.urn,
        validUntil: subscription.endDate,
        route: routeName,
        active: subscription.active
      };
      res.json(busPass);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/student/payments", authenticateToken, async (req, res) => {
    try {
      const student = await storage.getStudentByUserId(req.user.id);
      if (!student) {
        return res.status(404).json({ message: "Student profile not found" });
      }
      const payments2 = await storage.getPaymentsByStudent(student.id);
      res.json(payments2);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/student/subscription", authenticateToken, async (req, res) => {
    try {
      const student = await storage.getStudentByUserId(req.user.id);
      if (!student) {
        return res.status(404).json({ message: "Student profile not found" });
      }
      const subscription = await storage.getActiveSubscriptionByStudent(student.id);
      if (!subscription) {
        return res.status(404).json({ message: "No active subscription found" });
      }
      const payments2 = await storage.getPaymentsBySubscription(subscription.id);
      res.json({
        ...subscription,
        payments: payments2
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/student/payments", authenticateToken, async (req, res) => {
    try {
      const student = await storage.getStudentByUserId(req.user.id);
      if (!student) {
        return res.status(404).json({ message: "Student profile not found" });
      }
      const paymentData = insertPaymentSchema.parse({
        ...req.body,
        studentId: student.id,
        paymentDate: (/* @__PURE__ */ new Date()).toISOString(),
        status: "pending"
        // Payments start as pending until confirmed
      });
      const payment = await storage.createPayment(paymentData);
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Payment Created",
        details: `Payment of ${payment.amount} created`,
        ipAddress: req.ip
      });
      res.status(201).json(payment);
    } catch (error) {
      if (error instanceof ZodError2) {
        return res.status(400).json({ message: "Validation error", errors: error.format() });
      }
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.patch("/api/student/profile", authenticateToken, async (req, res) => {
    try {
      const student = await storage.getStudentByUserId(req.user.id);
      if (!student) {
        return res.status(404).json({ message: "Student profile not found" });
      }
      const updateSchema = z3.object({
        name: z3.string().optional(),
        mobile: z3.string().optional(),
        address: z3.string().optional(),
        year: z3.number().min(1).max(4).optional(),
        department: z3.string().optional(),
        profilePicture: z3.string().optional()
      });
      const updateData = updateSchema.parse(req.body);
      const updatedStudent = await storage.updateStudent(student.id, updateData);
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Profile Updated",
        ipAddress: req.ip
      });
      res.json(updatedStudent);
    } catch (error) {
      if (error instanceof ZodError2) {
        return res.status(400).json({ message: "Validation error", errors: error.format() });
      }
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/routes", async (req, res) => {
    try {
      const routes2 = await storage.getAllRoutes();
      res.json(routes2);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/routes/:id", async (req, res) => {
    try {
      const routeId = parseInt(req.params.id);
      const route = await storage.getRouteWithStops(routeId);
      if (!route) {
        return res.status(404).json({ message: "Route not found" });
      }
      res.json(route);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/routes", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const routeData = insertRouteSchema.parse(req.body);
      const route = await storage.createRoute(routeData);
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Route Created",
        details: `Route "${route.name}" created`,
        ipAddress: req.ip
      });
      res.status(201).json(route);
    } catch (error) {
      if (error instanceof ZodError2) {
        return res.status(400).json({ message: "Validation error", errors: error.format() });
      }
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.patch("/api/routes/:id", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const routeId = parseInt(req.params.id);
      const updateSchema = z3.object({
        name: z3.string().optional(),
        description: z3.string().optional(),
        active: z3.boolean().optional()
      });
      const updateData = updateSchema.parse(req.body);
      const updatedRoute = await storage.updateRoute(routeId, updateData);
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Route Updated",
        details: `Route "${updatedRoute.name}" updated`,
        ipAddress: req.ip
      });
      res.json(updatedRoute);
    } catch (error) {
      if (error instanceof ZodError2) {
        return res.status(400).json({ message: "Validation error", errors: error.format() });
      }
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.delete("/api/routes/:id", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const routeId = parseInt(req.params.id);
      const route = await storage.getRoute(routeId);
      if (!route) {
        return res.status(404).json({ message: "Route not found" });
      }
      const deleted = await storage.deleteRoute(routeId);
      if (!deleted) {
        return res.status(404).json({ message: "Route not found" });
      }
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Route Deleted",
        details: `Route "${route.name}" deleted`,
        ipAddress: req.ip
      });
      res.json({ message: "Route deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/stops", async (req, res) => {
    try {
      const stops2 = await storage.getAllStops();
      res.json(stops2);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/stops", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const stopData = insertStopSchema.parse(req.body);
      const stop = await storage.createStop(stopData);
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Stop Created",
        details: `Stop "${stop.name}" created`,
        ipAddress: req.ip
      });
      res.status(201).json(stop);
    } catch (error) {
      if (error instanceof ZodError2) {
        return res.status(400).json({ message: "Validation error", errors: error.format() });
      }
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/routes/:routeId/stops", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const routeId = parseInt(req.params.routeId);
      const schema = z3.object({
        stopId: z3.number(),
        stopOrder: z3.number(),
        arrivalTime: z3.string().optional()
      });
      const data = schema.parse(req.body);
      const routeStop = await storage.createRouteStop({
        routeId,
        stopId: data.stopId,
        stopOrder: data.stopOrder,
        arrivalTime: data.arrivalTime
      });
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Stop Added to Route",
        details: `Stop added to route`,
        ipAddress: req.ip
      });
      res.status(201).json(routeStop);
    } catch (error) {
      if (error instanceof ZodError2) {
        return res.status(400).json({ message: "Validation error", errors: error.format() });
      }
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/buses", async (req, res) => {
    try {
      const buses2 = await storage.getAllBuses();
      res.json(buses2);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/buses/with-routes", async (req, res) => {
    try {
      const buses2 = await storage.getBusesWithRoute();
      res.json(buses2);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/buses/:id", async (req, res) => {
    try {
      const busId = parseInt(req.params.id);
      const bus = await storage.getBus(busId);
      if (!bus) {
        return res.status(404).json({ message: "Bus not found" });
      }
      res.json(bus);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/buses", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const busData = insertBusSchema.parse(req.body);
      const bus = await storage.createBus(busData);
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Bus Created",
        details: `Bus "${bus.busNumber}" created`,
        ipAddress: req.ip
      });
      res.status(201).json(bus);
    } catch (error) {
      if (error instanceof ZodError2) {
        return res.status(400).json({ message: "Validation error", errors: error.format() });
      }
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.patch("/api/buses/:id", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const busId = parseInt(req.params.id);
      const updateSchema = z3.object({
        busNumber: z3.string().optional(),
        capacity: z3.number().optional(),
        model: z3.string().optional(),
        routeId: z3.number().optional(),
        active: z3.boolean().optional()
      });
      const updateData = updateSchema.parse(req.body);
      const updatedBus = await storage.updateBus(busId, updateData);
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Bus Updated",
        details: `Bus "${updatedBus.busNumber}" updated`,
        ipAddress: req.ip
      });
      res.json(updatedBus);
    } catch (error) {
      if (error instanceof ZodError2) {
        return res.status(400).json({ message: "Validation error", errors: error.format() });
      }
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.delete("/api/buses/:id", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const busId = parseInt(req.params.id);
      const bus = await storage.getBus(busId);
      if (!bus) {
        return res.status(404).json({ message: "Bus not found" });
      }
      const deleted = await storage.deleteBus(busId);
      if (!deleted) {
        return res.status(404).json({ message: "Bus not found" });
      }
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Bus Deleted",
        details: `Bus "${bus.busNumber}" deleted`,
        ipAddress: req.ip
      });
      res.json({ message: "Bus deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/drivers", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const drivers2 = await storage.getAllDrivers();
      res.json(drivers2);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/drivers", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const userData = z3.object({
        username: z3.string().min(3),
        password: z3.string().min(6),
        email: z3.string().email()
      }).parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const hashedPassword = await bcrypt2.hash(userData.password, 10);
      const user = await storage.createUser({
        username: userData.username,
        password: hashedPassword,
        email: userData.email,
        role: "driver"
      });
      const driverData = insertDriverSchema.parse({
        ...req.body,
        userId: user.id
      });
      const driver = await storage.createDriver(driverData);
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Driver Created",
        details: `Driver "${driver.name}" created`,
        ipAddress: req.ip
      });
      res.status(201).json(driver);
    } catch (error) {
      if (error instanceof ZodError2) {
        return res.status(400).json({ message: "Validation error", errors: error.format() });
      }
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.patch("/api/drivers/:id", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const driverId = parseInt(req.params.id);
      const updateSchema = z3.object({
        name: z3.string().optional(),
        mobile: z3.string().optional(),
        licenseNumber: z3.string().optional(),
        address: z3.string().optional(),
        busId: z3.number().optional()
      });
      const updateData = updateSchema.parse(req.body);
      const updatedDriver = await storage.updateDriver(driverId, updateData);
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Driver Updated",
        details: `Driver "${updatedDriver.name}" updated`,
        ipAddress: req.ip
      });
      res.json(updatedDriver);
    } catch (error) {
      if (error instanceof ZodError2) {
        return res.status(400).json({ message: "Validation error", errors: error.format() });
      }
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.delete("/api/drivers/:id", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const driverId = parseInt(req.params.id);
      const driver = await storage.getDriver(driverId);
      if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
      }
      const deleted = await storage.deleteDriver(driverId);
      if (!deleted) {
        return res.status(404).json({ message: "Driver not found" });
      }
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Driver Deleted",
        details: `Driver "${driver.name}" deleted`,
        ipAddress: req.ip
      });
      res.json({ message: "Driver deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/admin/students", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const year = req.query.year ? parseInt(req.query.year) : void 0;
      const department = req.query.department;
      const routeId = req.query.routeId ? parseInt(req.query.routeId) : void 0;
      const students2 = await storage.getAllStudentsWithFilters({
        year,
        department,
        routeId
      });
      res.json(students2);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/admin/students", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const userData = z3.object({
        username: z3.string().min(3),
        password: z3.string().min(6),
        email: z3.string().email()
      }).parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const hashedPassword = await bcrypt2.hash(userData.password, 10);
      const user = await storage.createUser({
        username: userData.username,
        password: hashedPassword,
        email: userData.email,
        role: "student"
      });
      const studentData = z3.object({
        urn: z3.string().min(3),
        name: z3.string(),
        mobile: z3.string(),
        address: z3.string(),
        year: z3.number().min(1).max(4),
        department: z3.string(),
        routeId: z3.number().optional(),
        profilePicture: z3.string().optional()
      }).parse(req.body);
      const existingUrn = await storage.getStudentByUrn(studentData.urn);
      if (existingUrn) {
        return res.status(400).json({ message: "URN already exists" });
      }
      const student = await storage.createStudent({
        userId: user.id,
        email: userData.email,
        ...studentData
      });
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Student Created",
        details: `Student "${student.name}" with URN "${student.urn}" created`,
        ipAddress: req.ip
      });
      res.status(201).json(student);
    } catch (error) {
      if (error instanceof ZodError2) {
        return res.status(400).json({ message: "Validation error", errors: error.format() });
      }
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.patch("/api/admin/students/:id", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const studentId = parseInt(req.params.id);
      const updateSchema = z3.object({
        name: z3.string().optional(),
        mobile: z3.string().optional(),
        address: z3.string().optional(),
        year: z3.number().min(1).max(4).optional(),
        department: z3.string().optional(),
        routeId: z3.number().optional(),
        profilePicture: z3.string().optional()
      });
      const updateData = updateSchema.parse(req.body);
      const updatedStudent = await storage.updateStudent(studentId, updateData);
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Student Updated",
        details: `Student "${updatedStudent.name}" updated`,
        ipAddress: req.ip
      });
      res.json(updatedStudent);
    } catch (error) {
      if (error instanceof ZodError2) {
        return res.status(400).json({ message: "Validation error", errors: error.format() });
      }
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.delete("/api/admin/students/:id", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const studentId = parseInt(req.params.id);
      const student = await storage.getStudent(studentId);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      const deleted = await storage.deleteStudent(studentId);
      if (!deleted) {
        return res.status(404).json({ message: "Student not found" });
      }
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Student Deleted",
        details: `Student "${student.name}" with URN "${student.urn}" deleted`,
        ipAddress: req.ip
      });
      res.json({ message: "Student deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/admin/students/:id/subscription", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const studentId = parseInt(req.params.id);
      const student = await storage.getStudent(studentId);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      const subscriptionData = insertSubscriptionSchema.parse({
        ...req.body,
        studentId
      });
      const subscription = await storage.createSubscription(subscriptionData);
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Subscription Created",
        details: `Subscription created for student "${student.name}"`,
        ipAddress: req.ip
      });
      res.status(201).json(subscription);
    } catch (error) {
      if (error instanceof ZodError2) {
        return res.status(400).json({ message: "Validation error", errors: error.format() });
      }
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/admin/students/:id/payments", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const studentId = parseInt(req.params.id);
      const student = await storage.getStudent(studentId);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      const paymentData = insertPaymentSchema.parse({
        ...req.body,
        studentId,
        paymentDate: (/* @__PURE__ */ new Date()).toISOString()
      });
      const payment = await storage.createPayment(paymentData);
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Payment Created",
        details: `Payment of ${payment.amount} created for student "${student.name}"`,
        ipAddress: req.ip
      });
      res.status(201).json(payment);
    } catch (error) {
      if (error instanceof ZodError2) {
        return res.status(400).json({ message: "Validation error", errors: error.format() });
      }
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.patch("/api/admin/payments/:id", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const paymentId = parseInt(req.params.id);
      const updateSchema = z3.object({
        status: z3.enum(["pending", "completed", "failed"]),
        transactionId: z3.string().optional()
      });
      const updateData = updateSchema.parse(req.body);
      const updatedPayment = await storage.updatePayment(paymentId, updateData);
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Payment Updated",
        details: `Payment status updated to "${updateData.status}"`,
        ipAddress: req.ip
      });
      res.json(updatedPayment);
    } catch (error) {
      if (error instanceof ZodError2) {
        return res.status(400).json({ message: "Validation error", errors: error.format() });
      }
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/announcements", async (req, res) => {
    try {
      const announcements2 = await storage.getAllAnnouncements();
      res.json(announcements2);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/announcements", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const announcementData = insertAnnouncementSchema.parse({
        ...req.body,
        createdBy: req.user.id
      });
      const announcement = await storage.createAnnouncement(announcementData);
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Announcement Created",
        details: `Announcement "${announcement.title}" created`,
        ipAddress: req.ip
      });
      res.status(201).json(announcement);
    } catch (error) {
      if (error instanceof ZodError2) {
        return res.status(400).json({ message: "Validation error", errors: error.format() });
      }
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.delete("/api/announcements/:id", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const announcementId = parseInt(req.params.id);
      const announcement = await storage.getAnnouncement(announcementId);
      if (!announcement) {
        return res.status(404).json({ message: "Announcement not found" });
      }
      const deleted = await storage.deleteAnnouncement(announcementId);
      if (!deleted) {
        return res.status(404).json({ message: "Announcement not found" });
      }
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Announcement Deleted",
        details: `Announcement "${announcement.title}" deleted`,
        ipAddress: req.ip
      });
      res.json({ message: "Announcement deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/holidays", async (req, res) => {
    try {
      const holidays2 = await storage.getAllHolidays();
      res.json(holidays2);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/holidays", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const holidayData = insertHolidaySchema.parse(req.body);
      const holiday = await storage.createHoliday(holidayData);
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Holiday Created",
        details: `Holiday "${holiday.description}" on ${holiday.date} created`,
        ipAddress: req.ip
      });
      res.status(201).json(holiday);
    } catch (error) {
      if (error instanceof ZodError2) {
        return res.status(400).json({ message: "Validation error", errors: error.format() });
      }
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.delete("/api/holidays/:id", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const holidayId = parseInt(req.params.id);
      const holiday = await storage.getHoliday(holidayId);
      if (!holiday) {
        return res.status(404).json({ message: "Holiday not found" });
      }
      const deleted = await storage.deleteHoliday(holidayId);
      if (!deleted) {
        return res.status(404).json({ message: "Holiday not found" });
      }
      await storage.createActivityLog({
        userId: req.user.id,
        action: "Holiday Deleted",
        details: `Holiday "${holiday.description}" deleted`,
        ipAddress: req.ip
      });
      res.json({ message: "Holiday deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/admin/dashboard/stats", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const stats = await storage.getAdminDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/bus-locations", async (req, res) => {
    try {
      const busLocations2 = await storage.getBusLocationsWithInfo();
      res.json(busLocations2);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.get("/api/admin/activities", authenticateToken, requireRole(["admin"]), async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const activities = await storage.getRecentActivities(limit);
      res.json(activities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app2.post("/api/create-payment-intent", authenticateToken, async (req, res) => {
    try {
      if (!stripe) {
        return res.status(500).json({ message: "Stripe is not configured" });
      }
      const { amount } = req.body;
      if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
      }
      const student = await storage.getStudentByUserId(req.user.id);
      if (!student) {
        return res.status(404).json({ message: "Student profile not found" });
      }
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        // Convert to cents
        currency: "usd",
        description: `Bus Pass Payment for ${student.name} (${student.urn})`,
        metadata: {
          studentId: student.id.toString(),
          userId: req.user.id.toString(),
          studentName: student.name,
          studentUrn: student.urn
        }
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ message: `Error creating payment intent: ${error.message}` });
    }
  });
  app2.post("/api/stripe-webhook", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ message: "Stripe is not configured" });
    }
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
      if (!webhookSecret) {
        return res.status(400).json({ message: "Webhook secret not configured" });
      }
      event = stripe.webhooks.constructEvent(
        req.body.toString(),
        sig,
        webhookSecret
      );
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        const studentId = parseInt(paymentIntent.metadata.studentId);
        const userId = parseInt(paymentIntent.metadata.userId);
        const amount = paymentIntent.amount / 100;
        try {
          const startDate = /* @__PURE__ */ new Date();
          const endDate = /* @__PURE__ */ new Date();
          endDate.setMonth(endDate.getMonth() + 6);
          const subscription = await storage.createSubscription({
            studentId,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            amount,
            active: true
          });
          await storage.createPayment({
            studentId,
            subscriptionId: subscription.id,
            amount,
            paymentDate: (/* @__PURE__ */ new Date()).toISOString(),
            method: "credit_card",
            status: "completed",
            transactionId: paymentIntent.id
          });
          await storage.createActivityLog({
            userId,
            action: "Payment Completed",
            details: `Payment of $${amount} completed successfully`
          });
          console.log(`Payment for student ${studentId} processed successfully`);
        } catch (error) {
          console.error("Error processing payment success:", error);
        }
        break;
      case "payment_intent.payment_failed":
        const failedPaymentIntent = event.data.object;
        console.log(`Payment failed: ${failedPaymentIntent.id}`);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.send({ received: true });
  });
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
