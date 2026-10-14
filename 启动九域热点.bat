@echo off
chcp 65001 >nul
title 九域热点 - 启动器
cd /d F:\INDUSTRYHOT.Site
set DOCKER="C:\Program Files\Docker\Docker\resources\bin\docker.exe"

echo ============================================
echo   九域热点  启动器
echo ============================================
echo.

echo [1/4] 启动容器（首次较慢）...
%DOCKER% compose up -d
if errorlevel 1 (
  echo.
  echo *** 启动失败：请确认 Docker Desktop 已打开。 ***
  pause
  exit /b 1
)

echo.
echo [2/4] 等待数据库就绪...
:waitdb
%DOCKER% exec aihot-db-1 pg_isready -U aihot >nul 2>&1
if errorlevel 1 (
  timeout /t 2 /nobreak >nul
  goto waitdb
)

echo.
echo [3/4] 触发一次采集（约需 1-3 分钟收料评分）...
%DOCKER% exec aihot-db-1 psql -U aihot -d aihot -c "UPDATE sources SET next_fetch_at = now();" >nul

echo.
echo [4/4] 打开浏览器...
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo.
echo ============================================
echo   已启动：http://localhost:3000
echo   采集正在进行，稍等 1-3 分钟刷新即可看到内容。
echo   看完后运行「停止九域热点.bat」关闭容器。
echo   （关闭本窗口不影响运行）
echo ============================================
echo.
pause
