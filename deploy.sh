
( cd paper-critic && npm install && npm run build )
( cd paper-critic-backend && npm install && npm run build && export PORT=80 && export PAPER_CRITIC_DEPLOY=1 && npm run start )
