import React from 'react';

const Repository = ({ repository, onFetchMoreIssues, onStarRepository, onReactionIssue }) => (
  <div>
    <p>
      <strong>Repository:</strong>
      <p>Description: {repository.description}</p>
      <p>
        Name: <a href={repository.url}>{repository.name}</a>
      </p>
    </p>
    <p>Total Open Issues: {repository.issues.totalCount}</p>
    <button
      type='button'
      onClick={() => onStarRepository(repository.id, repository.viewerHasStarred)}
    >
      {repository.stargazers.totalCount} {repository.viewerHasStarred ? 'Unstar' : 'Star'}
    </button>

    <ul>
      {repository.issues.edges.map((issue) => (
        <li key={issue.node.id}>
          <a href={issue.node.url}>{issue.node.title}</a>
          <ul>
            {issue.node.reactions.edges.map((reaction) => (
              <li
                key={reaction.node.id}
                onClick={() =>
                  onReactionIssue(issue.node.id, (reaction.node.content = 'THUMBS_UP'))
                }
              >
                {reaction.node.content}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
    {repository.issues.pageInfo.hasNextPage && <button onClick={onFetchMoreIssues}>More</button>}
  </div>
);

export default Repository;
