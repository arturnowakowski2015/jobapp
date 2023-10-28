import { useState, useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AppRoute } from 'AppRoute';

import * as styles from './Home.styles';

export interface JobEntity {
  languages?: LanguagesEntity[] | null;
}
export interface LanguagesEntity {
  name: string;
  frameworks?: FrameworksEntity[] | null;
}
export interface FrameworksEntity {
  name: string;
  levels?: LevelsEntity[] | null;
}
export interface LevelsEntity {
  name: string;
  projects?: ProjectsEntity[] | null;
}
export interface ProjectsEntity {
  name: string;
}

export const Home = () => {
  const [data, setData] = useState<JobEntity | undefined>(undefined);
  useEffect(() => {
    const get = async () => {
      const r = await axios.get('http://localhost:9595/jobs/public');
      setData(r.data);
    };
    get();
  }, []);

  const renderTree = (nodes: JobEntity) =>
    nodes?.languages
      ? nodes?.languages?.map((node: any) => {
          return (
            <TreeItem
              key={`id_${node?.name}`}
              nodeId={`id_${node?.name}`}
              label={node?.name}
            >
              {node?.frameworks ? (
                <TreeView
                  aria-label="rich object"
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpanded={['frameworks']}
                  defaultExpandIcon={<ChevronRightIcon />}
                >
                  {node?.frameworks?.map((framework: any) => {
                    return (
                      <TreeItem
                        key={`id_${framework?.name}`}
                        nodeId={`id_${framework?.name}`}
                        label={framework?.name}
                      >
                        {framework?.levels
                          ? framework?.levels?.map((level: any, ii: number) => {
                              return (
                                <TreeView
                                  aria-label="rich object"
                                  defaultCollapseIcon={<ExpandMoreIcon />}
                                  defaultExpanded={[`levels${ii}`]}
                                  defaultExpandIcon={<ChevronRightIcon />}
                                >
                                  <TreeItem
                                    key={`id_${level?.name}`}
                                    nodeId={`id_${level?.name}`}
                                    label={level?.name}
                                  >
                                    {level?.projects
                                      ? level?.projects?.map((project: any) => {
                                          return (
                                            <TreeView
                                              sx={{
                                                paddingLeft: '30px',
                                                cursor: 'pointer',
                                              }}
                                              key={`id_${project?.name}`}
                                            >
                                              {'  '}
                                              {project?.name}
                                            </TreeView>
                                          );
                                        })
                                      : null}
                                  </TreeItem>
                                </TreeView>
                              );
                            })
                          : null}
                      </TreeItem>
                    );
                  })}
                </TreeView>
              ) : null}
            </TreeItem>
          );
        })
      : null;
  return (
    <Paper sx={styles.container}>
      <Typography variant="h1">HR analytics</Typography>
      <Box sx={styles.buttonsContainer}>
        <Button
          component={Link}
          to={AppRoute.signIn}
          variant="contained"
          size="large"
        >
          Sign In
        </Button>
        <Button
          component={Link}
          to={AppRoute.signUp}
          variant="contained"
          size="large"
        >
          Sign Up
        </Button>
      </Box>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['languages']}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(data as JobEntity)}
      </TreeView>
    </Paper>
  );
};
