<template>
    <Layout :style="{margin: '0 200px'}">
        <Content :style="{padding: '0 16px 16px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
            <Breadcrumb :style="{margin: '16px 0'}">
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>Components</BreadcrumbItem>
                <BreadcrumbItem>Layout</BreadcrumbItem>
            </Breadcrumb>
            <Card>
                <div style="height: 600px">Content</div>
            </Card>
        </Content>
        <Sider :style="{position: 'fixed', height: '100vh', right: 0, overflow: 'auto'}">
            Sider
        </Sider>
    </Layout>
</template>
<script>
export default {

}
</script>