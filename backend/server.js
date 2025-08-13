const http = require('http');
const url = require('url');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Health check endpoint
  if (path === '/health' || path === '/api/app2/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      service: 'app2-backend',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }));
    return;
  }

  // Tasks API endpoint
  if (path === '/api/app2/tasks') {
    const tasks = [
      { 
        id: 1, 
        title: 'Infrastructure Setup', 
        description: 'Set up the multi-application deployment platform',
        status: 'completed',
        priority: 'high',
        assignee: 'DevOps Team'
      },
      { 
        id: 2, 
        title: 'App1 Development', 
        description: 'User management system implementation',
        status: 'in-progress',
        priority: 'high',
        assignee: 'Frontend Team'
      },
      { 
        id: 3, 
        title: 'App2 Development', 
        description: 'Task management system implementation',
        status: 'in-progress',
        priority: 'high',
        assignee: 'Backend Team'
      },
      { 
        id: 4, 
        title: 'Testing & Documentation', 
        description: 'Comprehensive testing and documentation',
        status: 'pending',
        priority: 'medium',
        assignee: 'QA Team'
      }
    ];
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      data: tasks,
      total: tasks.length
    }));
    return;
  }

  // Projects API endpoint
  if (path === '/api/app2/projects') {
    const projects = [
      {
        id: 1,
        name: 'mhylle.com Platform',
        description: 'Multi-application deployment platform',
        status: 'active',
        tasks_count: 4,
        completion: 75
      }
    ];
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      data: projects,
      total: projects.length
    }));
    return;
  }

  // Status endpoint
  if (path === '/api/app2/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      application: 'Task Management System',
      version: '1.0.0',
      status: 'running',
      features: [
        'Task Creation & Management',
        'Project Organization',
        'Collaboration Tools',
        'Reporting & Analytics'
      ],
      endpoints: [
        'GET /api/app2/health',
        'GET /api/app2/status',
        'GET /api/app2/tasks',
        'GET /api/app2/projects'
      ]
    }));
    return;
  }

  // Root endpoint
  if (path === '/' || path === '/api/app2') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'App2 Backend API is running',
      service: 'Task Management System',
      version: '1.0.0',
      endpoints: {
        health: '/api/app2/health',
        status: '/api/app2/status',
        tasks: '/api/app2/tasks',
        projects: '/api/app2/projects'
      }
    }));
    return;
  }

  // 404 for other routes
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    error: 'Not Found',
    message: 'The requested endpoint does not exist',
    available_endpoints: ['/api/app2/health', '/api/app2/status', '/api/app2/tasks', '/api/app2/projects']
  }));
});

server.listen(port, () => {
  console.log(`App2 Backend server running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/api/app2/health`);
  console.log(`Status: http://localhost:${port}/api/app2/status`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
