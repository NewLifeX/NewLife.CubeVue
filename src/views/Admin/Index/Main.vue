<template>
  <div>
    <div class="table-responsive">
      <table
        class="table table-bordered table-hover table-striped table-condensed"
      >
        <thead>
          <tr>
            <th colspan="4">
              服务器信息
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="name">
              应用系统：
            </td>
            <td class="value">
              <!-- @if (this.Has((PermissionFlags)16)) -->

              <a style="cursor: pointer;" @click="restart">重启应用系统</a>

              &nbsp;&nbsp;&nbsp;&nbsp;{{ model.RawUrl }}
            </td>
            <td class="name">
              目录：
            </td>
            <td class="value">
              {{ model.ContentRootPath }}
            </td>
          </tr>
          <tr>
            <td class="name">
              域名地址：
            </td>
            <td class="value">
              <span title="主机">{{ model.Host }}</span
              >，
              <span title="本地">{{ model.LocalHost }}</span>
              &nbsp;<span title="远程">{{ model.RemoteHost }}</span>
            </td>
            <td class="name">
              应用程序：
            </td>
            <td class="value">
              <span :title="model.CommandLine">{{ model.ProcessName }}</span>
            </td>
          </tr>
          <tr>
            <td class="name">
              应用域：
            </td>
            <td class="value">
              {{ model.CurDomainFriendlyName }}
              <!-- <a href="@Url.Action("Main", new{ id = "Assembly" })" target="_blank" title="点击打开进程程序集列表">程序集列表</a>
                    <a href="@Url.Action("Main", new{ id = "ProcessModules" })" target="_blank" title="点击打开进程模块列表">模块列表</a>
                    <a href="@Url.Action("Main", new{ id = "ServerVar" })" target="_blank" title="点击打开服务器变量列表">服务器变量列表</a> -->
            </td>
            <td class="name">
              .Net 版本：
            </td>
            <td class="value">
              {{ model.EnvVersion }} &nbsp;{{ model.FrameworkName }}
            </td>
          </tr>
          <tr>
            <td class="name">
              操作系统：
            </td>
            <td class="value" :title="model.Guid">
              {{ model.OSName }} {{ model.OSVersion }}
            </td>
            <td class="name">
              机器用户：
            </td>
            <td class="value" :title="model.UUID">
              <span v-if="model.Product !== undefined"
                >{{ model.Product }}，</span
              >
              {{ model.UserName + '/' + model.MachineName }}
            </td>
          </tr>
          <tr>
            <td class="name">
              处理器：
            </td>
            <td class="value" :title="model.CpuID">
              {{ model.Processor }}，
              {{ model.ProcessorCount }}
              核心，{{ model.CpuRate }}
              <span v-if="model.Temperature > 0"
                >，{{ model.Temperature }} ℃</span
              >
            </td>
            <td class="name">
              时间：
            </td>

            <td
              class="value"
              title="这里使用了服务器默认的时间格式！后面是开机时间。"
            >
              {{ model.DateTimeNow }}，开机{{ model.Uptime }}
            </td>
          </tr>
          <tr>
            <td class="name">
              内存：
            </td>
            <td class="value">
              物理：{{ model.AvailableMemory }}M / {{ model.Memory }}M，
              工作/提交: {{ model.WorkingSet64 }}M/{{
                model.PrivateMemorySize64
              }}M GC: {{ model.TotalMemory }}M
              <a @click="memoryFree" title="点击释放进程内存">释放内存</a>
            </td>
            <td class="name">
              进程时间：
            </td>
            <td class="value">
              <!-- @process.TotalProcessorTime.TotalSeconds.ToString("N2")秒 启动于 @process.StartTime.ToLocalTime().ToFullString() -->
            </td>
          </tr>
          <tr>
            <td class="name">
              Session：
            </td>
            <td class="value">
              <!-- @httpContext.Session.Keys.Count() 个 -->
              <a
                @click="main('Session')"
                target="_blank"
                title="点击打开Session列表"
                >Session列表</a
              >
              <!-- ，@gc -->
            </td>
            <td class="name">
              <!-- @{ var app = ApplicationManager.Load();} -->
              应用启动：
            </td>
            <td class="value">
              <!-- 启动于 @app.StartTime.ToLocalTime().ToFullString() -->
            </td>
          </tr>
        </tbody>
      </table>
      <table
        class="table table-bordered table-hover table-striped table-condensed"
      >
        <thead>
          <tr>
            <th>名称</th>
            <th>标题</th>
            <th>文件版本</th>
            <th>内部版本</th>
            <th>编译时间</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <!-- @foreach (AssemblyX item in ViewBag.MyAsms)
            {
                <tr>
                    <td>@item.Name</td>
                    <td>@item.Title</td>
                    <td>@item.FileVersion</td>
                    <td>@item.Version</td>
                    <td>@(item.Compile.Year <= 2000 ? "" : item.Compile.ToFullString())</td>
                    <td>@item.Description</td>
                </tr>
            } -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        RawUrl: 'RawUrl',
        ContentRootPath: 'ContentRootPath',
        Host: 'Host',
        LocalHost: 'LocalHost',
        RemoteHost: 'RemoteHost',
        CommandLine: 'CommandLine',
        ProcessName: 'ProcessName',
        CurDomainFriendlyName: 'FriendlyName',
        EnvVersion: 'EnvVersion',
        FrameworkName: 'FrameworkName',
        Guid: 'Guid',
        OSName: 'OSName',
        OSVersion: 'OSVersion',
        Product: 'Product',
        UserName: 'UserName',
        MachineName: 'MachineName',
        UUID: 'UUID',
        Processor: 'Processor',
        ProcessorCount: 'ProcessorCount',
        CpuRate: 'CpuRate',
        Temperature: 0,
        DateTimeNow: 'DateTimeNow',
        Uptime: 'Uptime',
        AvailableMemory: 'AvailableMemory',
        Memory: 'Memory',
        WorkingSet64: 'WorkingSet64',
        PrivateMemorySize64: 'PrivateMemorySize64',
        TotalMemory: 'TotalMemory',
      },
    }
  },
  methods: {
    restart() {
      this.$alert(
        '仅重启ASP.Net Core应用程序域，而不是操作系统！<br/>确认重启？',
        '提示',
        {
          confirmButtonText: 'confirm',
          callback: (action) => {
            console.log(action)
          },
        }
      )
    },
    memoryFree() {
      console.log('memoryFree')
    },
    main(id) {
      console.log(id)
    },
  },
}
</script>

<style></style>
