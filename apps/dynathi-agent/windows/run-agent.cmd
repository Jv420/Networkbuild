@echo off
setlocal

cd /d "%~dp0.."

if not exist logs mkdir logs

echo [%date% %time%] Starting Dynathi Agent >> logs\agent.log
node src\agent.js >> logs\agent.log 2>> logs\agent-error.log
echo [%date% %time%] Dynathi Agent stopped >> logs\agent.log
