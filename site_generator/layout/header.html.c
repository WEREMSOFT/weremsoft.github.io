<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>WeremSoft - Mi Twitter Personal</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #f0f2f5;
      margin: 0;
      color: #0f1419;
    }

    main {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      min-height: 100vh;
    }

    /* 🔵 Header azul clásico */
    .topbar {
      background-color: #1DA1F2;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: white;
      font-weight: bold;
      font-size: 20px;
    }
    .topbar svg {
      height: 28px;
      fill: white;
    }

    /* Banner */
    .profile-header {
      width: 100%;
      height: 200px;
      background: url('header.jpeg') no-repeat center/cover;
      position: relative;
    }

    /* Avatar solapado sobre el banner */
    .profile-info {
      display: flex;
      flex-direction: column;
      padding: 0 16px;
      position: relative;
      top: -48px;
    }

    .profile-info img.avatar {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      border: 4px solid white;
      margin-bottom: 8px;
    }

    .profile-details {
      display: flex;
      flex-direction: column;
    }

    .profile-details .name {
      font-weight: bold;
      font-size: 1.3em;
    }

    .profile-details .handle {
      color: #555;
      font-size: 0.95em;
      margin-bottom: 8px;
    }

    .profile-details .bio {
      font-size: 0.9em;
      color: #0f1419;
      max-width: 100%;
    }

    /* Tweets */
    .tweet {
      display: flex;
      gap: 12px;
      padding: 12px 16px;
      border-top: 1px solid #ddd;
      cursor: pointer;
      transition: background 0.2s;
    }
    .tweet:hover { background: #f7f9fa; }

    .tweet img.avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .tweet-content { flex: 1; }

    .tweet-header {
      font-weight: bold;
      font-size: 0.95em;
    }

    .tweet-header span {
      color: #555;
      font-weight: normal;
      margin-left: 4px;
      font-size: 0.9em;
    }

    .tweet-text {
      margin: 4px 0;
      font-size: 1em;
      line-height: 1.4;
    }

    .tweet time {
      color: #555;
      font-size: 0.8em;
    }
  </style>
</head>
<body>
  <main>
    <!-- 🔵 Header azul con pajarito y texto -->
    <div class="topbar">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g>
          <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 
                   1.014-.611 1.794-1.574 2.163-2.724-.951.564-2.005.974-3.127 
                   1.195-.897-.959-2.178-1.555-3.594-1.555-2.717 
                   0-4.924 2.207-4.924 4.924 0 .39.045.765.127 
                   1.124-4.09-.205-7.719-2.165-10.148-5.144-.424.729-.667 
                   1.577-.667 2.475 0 1.708.87 3.216 2.188 
                   4.099-.807-.026-1.566-.247-2.229-.616v.062c0 
                   2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.317 
                   0-.626-.03-.928-.086.627 1.956 2.444 3.379 4.6 
                   3.419-1.68 1.318-3.809 2.105-6.102 
                   2.105-.397 0-.788-.023-1.175-.069 2.179 1.397 
                   4.768 2.213 7.557 2.213 9.054 0 14-7.496 
                   14-13.986 0-.21 0-.423-.015-.634.961-.689 
                   1.8-1.56 2.46-2.548z"></path>
        </g>
      </svg>
      Tweeter
    </div>

    <!-- Banner + perfil -->
    <div class="profile-header"></div>

    <div class="profile-info">
      <img class="avatar" src="https://avatars.githubusercontent.com/u/808249?v=4" alt="Avatar">
      <div class="profile-details">
        <div class="name">WEREMSOFT</div>
        <div class="handle">@WEREMSOFT</div>
        <div class="bio">Past: Vox Populi, Vox Dei(a werewolf thriller). Working in a company created in 1690. GPU & HPC projects. Anti-Crypto.
        <ul>
          <li><a href='old_site/index.html'>full bio & projects</li>
          <li><a href="https://x.com/weremsoft">old twitter acctount</a></li>
        </ul>
        </div>
      </div>
    </div>
