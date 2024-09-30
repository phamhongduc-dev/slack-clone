interface Props {
  params: {
    workspaceId: string
  }
}

export default function WorkSpaceIPage({ params }: Props) {
  return <div>id: {params.workspaceId}</div>
}
