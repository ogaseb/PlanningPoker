import JiraClient from "jira-connector";

let jira;
module.exports = {
  jiraLogin: function ({jiraLogin: username, jiraPassword: password, jiraSubdomain}) {
    jira = new JiraClient({
      host: `${jiraSubdomain}.atlassian.net`,
      basic_auth: {username, password}
    });
    if (jira) {
      return jira.board.getAllBoards({startAt: 0});
    }
  },
  jiraGetBacklogIssues: function (boardId) {
    if (jira){
      return jira.board.getIssuesForBacklog({boardId});
    }
  },
  jiraGetBoardIssues: function (boardId) {
    if (jira){
      return jira.board.getIssuesForBoard({boardId});
    }
  }
}

