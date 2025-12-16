import type { Meta, StoryObj } from "@storybook/react";
import RepoListView from "./repoListView";
import { type Repository } from "@/lib/types/githubSchemas";

const mockRepo: Repository = {
  id: 1,
  name: "react",
  full_name: "facebook/react",
  description:
    "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
  stargazers_count: 213000,
  watchers_count: 6000,
  forks_count: 40000,
  open_issues_count: 500,
  language: "JavaScript",
  html_url: "https://github.com/facebook/react",
  owner: {
    login: "facebook",
    avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
    html_url: "https://github.com/facebook",
  },
  license: { name: "MIT" },
  updated_at: "2023-01-01T00:00:00Z",
};

//
const meta = {
  title: "Repo/RepoListView",
  component: RepoListView,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {
    isLoading: false,
    isError: false,
    errorMessage: "",
    repositories: [] as Repository[],
    isFetchingNextPage: false,
    scrollTriggerRef: null,
  },
} satisfies Meta<typeof RepoListView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    repositories: [
      mockRepo,
      {
        ...mockRepo,
        id: 2,
        name: "next.js",
        full_name: "vercel/next.js",
        description: "The React Framework",
      },
      {
        ...mockRepo,
        id: 3,
        name: "vue",
        full_name: "vuejs/vue",
        description: "Vue.js is a progressive framework",
      },
    ],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    repositories: [],
  },
};

export const LoadingMore: Story = {
  args: {
    repositories: [mockRepo, mockRepo, mockRepo],
    isFetchingNextPage: true,
  },
};

export const Empty: Story = {
  args: {
    repositories: [],
  },
};

export const Error: Story = {
  args: {
    isError: true,
    errorMessage: "Failed to fetch repositories. Please try again later.",
  },
};
